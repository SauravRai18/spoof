
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  GithubAuthProvider, 
  signInWithPopup,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  arrayUnion, 
  onSnapshot,
  collection,
  getDocs,
  query,
  where,
  writeBatch
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { User, SectorType, Project } from '../types';
import { SECTORS, MOCK_PROJECTS } from '../constants';

class AuthService {
  private currentUser: User | null = null;
  private authUnsubscribe: (() => void) | null = null;
  private docUnsubscribe: (() => void) | null = null;

  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (this.docUnsubscribe) this.docUnsubscribe();

      if (firebaseUser) {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        
        this.docUnsubscribe = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            this.currentUser = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              completedProjects: data.completedProjects || [],
              currentSector: data.currentSector || null
            };
            callback(this.currentUser);
          } else {
            this.currentUser = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              completedProjects: [],
              currentSector: null
            };
            callback(this.currentUser);
          }
        });
      } else {
        this.currentUser = null;
        callback(null);
      }
    });
  }

  async login(email: string, pass: string) {
    const credential = await signInWithEmailAndPassword(auth, email, pass);
    await this.ensureUserDoc(credential.user);
    return credential.user;
  }

  async signup(email: string, pass: string, name: string) {
    const credential = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(credential.user, {
      displayName: name,
      photoURL: `https://picsum.photos/seed/${email}/200`
    });
    await this.ensureUserDoc(credential.user, { displayName: name });
    return credential.user;
  }

  async loginWithGithub() {
    const provider = new GithubAuthProvider();
    const credential = await signInWithPopup(auth, provider);
    await this.ensureUserDoc(credential.user);
    return credential.user;
  }

  private async ensureUserDoc(firebaseUser: FirebaseUser, extraData: any = {}) {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const docSnap = await getDoc(userDocRef);
    if (!docSnap.exists()) {
      await setDoc(userDocRef, {
        completedProjects: [],
        currentSector: null,
        ...extraData
      });
    }
  }

  async markProjectCompleted(projectId: string) {
    if (auth.currentUser) {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, {
        completedProjects: arrayUnion(projectId)
      });
    }
  }

  async setSector(sector: SectorType) {
    if (auth.currentUser) {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, {
        currentSector: sector
      });
    }
  }

  async logout() {
    if (this.docUnsubscribe) this.docUnsubscribe();
    await signOut(auth);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  // --- Database Methods ---

  async seedDatabase() {
    const batch = writeBatch(db);

    // Seed Sectors
    SECTORS.forEach(s => {
      const sectorRef = doc(db, 'sectors', s.id);
      batch.set(sectorRef, {
        name: s.title,
        description: s.description,
        type: s.type
      });
    });

    // Seed Projects
    MOCK_PROJECTS.forEach(p => {
      const id = p.id === 'fin-1' ? 'wallet-system' : p.id;
      const projectRef = doc(db, 'projects', id);
      batch.set(projectRef, {
        sectorId: p.sector.toLowerCase(),
        title: p.title,
        level: p.difficulty,
        brd: p.brd,
        architecture: p.architecture,
        database: p.database,
        apis: p.api,
        tasks: p.tasks,
        sector: p.sector
      });
    });

    await batch.commit();
    console.log('Database seeded successfully');
  }

  async getSectors() {
    const querySnapshot = await getDocs(collection(db, 'sectors'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getProjectsBySector(sectorId: string) {
    const q = query(collection(db, 'projects'), where('sectorId', '==', sectorId.toLowerCase()));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getProjectById(projectId: string) {
    const docRef = doc(db, 'projects', projectId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      // Map Firestore fields back to Project interface
      return {
        id: docSnap.id,
        ...data,
        difficulty: data.level,
        api: data.apis,
      } as Project;
    }
    return null;
  }
}

export const authService = new AuthService();
