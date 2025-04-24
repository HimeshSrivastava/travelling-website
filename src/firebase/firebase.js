import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage';
import app from './firebase-config'

const auth= getAuth(app);
const db=getFirestore(app);
const storage=getStorage(app);

export {auth,db,storage}