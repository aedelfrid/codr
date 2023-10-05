import { openDB } from 'idb';

const initdb = async () =>
  openDB('codr', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('codr')) {
        console.log('codr database already exists');
        return;
      }
      db.createObjectStore('codr', { keyPath: 'id', autoIncrement: true });
      console.log('codr database created');
    },
  });


export const putDb = async (content) => {
  const codrDB = await openDB('codr',1);
  const tx = codrDB.transaction('codr', 'readwrite');
  // tx is transaction. doesn't immediately click but makes sense once you realize....
  const store = tx.objectStore('codr');
  const req = store.add({ code: content });
  const result = await req;
  console.log(result, 'Added data to DB.') 
};

export const getDb = async () => {
  const codrDB = await openDB('codr',1);
  const tx = codrDB.transaction('codr', 'readonly');
  // tx is transaction. doesn't immediately click but makes sense once you realize....
  const store = tx.objectStore('codr');
  const req = store.getAll();
  const result = await req;
  console.log(result);
  return result
};

initdb();
