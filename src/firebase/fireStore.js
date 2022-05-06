import { addDoc, collection, getFirestore, serverTimestamp, doc, getDoc, onSnapshot, where, query, orderBy, getDocs } from "firebase/firestore";


// Call and import the firestore
const firestore = getFirestore();
export const database = {
  folders: async (folder, type) => {
    try {
      folder.createdAt = serverTimestamp();
      await addDoc(collection(firestore, `folders.${type}`), folder);
    } catch(err) {
      console.log(err)
    }
  },
  files: async (file, type) => {
    try {
      file.createdAt = serverTimestamp();
      await addDoc(collection(firestore, `files.${type}`), file);
    } catch(err) {
      console.log(err)
    }
  },
  formatDoc: doc => {
      return {id: doc.id, ...doc.data()}
  }
}

export async function getFolder(id, type) {
    try {
        const docRef = doc(firestore, `folders.${type}`, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap;
        } else {
          throw new Error();
        }
    } catch(err) {
        return err;
    }
}

export function getFolders(folderId, currentUserId, dispatch, action, type) {
    const q = query(collection(firestore, `folders.${type}`), where('parentId', '==', folderId), where('userId', '==', currentUserId), orderBy('createdAt'))
    const unsub = onSnapshot(q, (doc) => {
        dispatch({
            type: action,
            payload: { childFolders: doc.docs.map(database.formatDoc) }
        });
    });

    return unsub;
}

export function getFiles(folderId, currentUserId, dispatch, action, type) {
  const q = query(collection(firestore, `files.${type}`), where('folderId', '==', folderId), where('userId', '==', currentUserId), orderBy('createdAt'));
  const unsub = onSnapshot(q, (doc) => {
      dispatch({
          type: action,
          payload: { childFiles: doc.docs.map(database.formatDoc) }
      });
      return doc.docs;
  });
  return unsub;
}
export async function getSameFiles(folderId, currentUserId, name, type) {
  const q = query(collection(firestore, `files.${type}`), where('name', '==', name), where('userId', '==', currentUserId), where('folderId', '==', folderId));

  const querySnapshot = await getDocs(q);
  return querySnapshot;
}