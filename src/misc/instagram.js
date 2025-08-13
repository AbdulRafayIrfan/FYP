import { db } from "./firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

const FIRESTORE_COLLECTION_PATH = "instagramPosts";
const collectionRef = db.collection(FIRESTORE_COLLECTION_PATH);

const VALIDITY_PERIOD_MS = 7 * 24 * 60 * 60 * 1000;
const API_KEY = process.env.INSTAGRAM_RAPID_API_KEY;
const API_URL =
  "https://instagram-scraper-20251.p.rapidapi.com/userposts/?username_or_id=bub_bh&url_embed_safe=true";
const OPTIONS = {
  method: "GET",
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "instagram-scraper-20251.p.rapidapi.com",
  },
};

export async function getPosts() {
  const docsRef = await collectionRef.listDocuments();
  if (docsRef.length > 1) {
    const needsUpdate = await checkForUpdate();

    if (needsUpdate == true) {
      return updatePosts();
    } else if (needsUpdate == false) {
      return getPostsFromFirestore();
    }
  } else {
    return initializePosts();
  }
}

async function checkForUpdate() {
  let querySnap = await collectionRef.orderBy("updatedAt").limit(6).get();
  let queryDocSnaps = querySnap.docs;
  let post = queryDocSnaps[0].data();
  let updatedDate = post.updatedAt.toDate();
  let today = new Date();

  if (today - updatedDate >= VALIDITY_PERIOD_MS) {
    return true;
  } else {
    return false;
  }
}

async function updatePosts() {
  let docs = [];
  let posts = await fetchLatestPosts();
  let querySnap = await collectionRef.orderBy("updatedAt").limit(6).get();
  let snapDocs = querySnap.docs;

  for (let doc of snapDocs) {
    docs.push(doc.ref);
  }

  let writeBatch = db.batch();
  for (let i = 0; i < 6; i++) {
    writeBatch.update(docs[i], posts[i]);
  }

  try {
    await writeBatch.commit();
    return getPostsFromFirestore();
  } catch (error) {}
}

async function initializePosts() {
  let posts = await fetchLatestPosts();
  let writeBatch = db.batch();
  for (let post of posts) {
    let docRef = collectionRef.doc();
    writeBatch.create(docRef, { ...post, updatedAt: Timestamp.now() });
  }

  try {
    await writeBatch.commit();
    return getPostsFromFirestore();
  } catch (error) {
    console.error(error);
  }
}

async function fetchLatestPosts() {
  try {
    const response = await fetch(API_URL, OPTIONS);
    const result = await response.json();
    return filterResponse(result);
  } catch (error) {
    console.error(error);
  }
}

function filterResponse(jsonResp) {
  const posts = [];
  const items = jsonResp.data.items;
  for (let i = 3; i < 9; i++) {
    const obj = {
      type: items[i].media_format,
      code: items[i].code,
      imageURL: items[i].thumbnail_url,
    };
    posts.push(obj);
  }
  return posts;
}

async function getPostsFromFirestore() {
  let posts = [];
  try {
    let querySnap = await collectionRef.orderBy("updatedAt").limit(6).get();
    let docQuerySnap = querySnap.docs;
    docQuerySnap.forEach(function (docSnap) {
      const obj = docSnap.data();
      obj.updatedAt = obj.updatedAt.toDate().toISOString();
      posts.push(obj);
    });
    return posts;
  } catch (error) {
    console.error(error);
  }
}
