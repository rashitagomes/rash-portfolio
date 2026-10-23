import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  setDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const WORK_COLLECTION = "work";
const SETTINGS_DOC = "settings/site";

export const DEFAULT_SETTINGS = {
  name: "Your Name",
  heroTagline: ["Your Role"],
  heroSub: "A short line about what you do.",
  aboutTitle: "About Me",
  aboutSub: "A short introduction goes here. You can edit this from the admin panel.",
  yearsExperience: 0,
  yearsLabel: "Years of Experience",
  satisfactionBadge: "",
  profileImage: "",
  coverImage: "",
  contactName: "",
  email: "",
  phone: "",
  whatsapp: "",
  address: "",
  contactHeroTitle: "Get in touch",
  contactHeroSub: "Reach out about projects, collaborations, or just to say hi.",
  formspreeUrl: "",
  resumeUrl: "",
  linkedinUrl: "",
  instagramUrl: "",
  githubUrl: "",
  experienceItems: [], // [{ role, org, period, description }]
  skills: [], // [{ label, value }]
  themes: [], // [{ name, bg, card, line, accent, accentHover, onAccent, text, muted }]
};

/** Live-subscribes to the work (projects + games) collection, newest first. */
export function subscribeWork(callback) {
  const q = query(collection(db, WORK_COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(items);
  });
}

export async function addWorkItem(item) {
  return addDoc(collection(db, WORK_COLLECTION), {
    ...item,
    createdAt: serverTimestamp(),
  });
}

export async function updateWorkItem(id, item) {
  return updateDoc(doc(db, WORK_COLLECTION, id), item);
}

export async function deleteWorkItem(id) {
  return deleteDoc(doc(db, WORK_COLLECTION, id));
}

/** Live-subscribes to the single site-settings document. */
export function subscribeSettings(callback) {
  return onSnapshot(doc(db, SETTINGS_DOC), (snap) => {
    callback(snap.exists() ? { ...DEFAULT_SETTINGS, ...snap.data() } : DEFAULT_SETTINGS);
  });
}

export async function getSettingsOnce() {
  const snap = await getDoc(doc(db, SETTINGS_DOC));
  return snap.exists() ? { ...DEFAULT_SETTINGS, ...snap.data() } : DEFAULT_SETTINGS;
}

export async function saveSettings(partial) {
  return setDoc(doc(db, SETTINGS_DOC), partial, { merge: true });
}
