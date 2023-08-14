import { doc, collection, addDoc, query, onSnapshot, orderBy, getDocs, where } from 'firebase/firestore';
import { db, getCurrentUserInfo } from './firebase';
import dayjs from 'dayjs';
import { FirebaseError } from 'firebase/app';
import { SnapshotMessages } from './store';

/**
 * 部屋が存在するか
 * @param {string} name 部屋名
 */
export const existsRoom = async (name = '') => {
	try {
		// すでに部屋が作成済みかチェック
		const q = query(
			collection(db, 'rooms'),
			where('name', '==', name));
		const querySnapshot = await getDocs(q);
		const exists = querySnapshot.size > 0;
		return exists;
	} catch(e){
		return false;
	}
}

/**
 * 部屋を登録
 * @param {string} name 作成する部屋名
 * @returns 部屋が利用可能か
 */
export const postRoom = async (name = '') => {
	try {
		const userInfo = getCurrentUserInfo();
		if (userInfo == null){ return false; }

		const exists = await existsRoom(name);
		if (exists){ return true; }

		await addDoc(collection(db, 'rooms'), {
			name: name,
			created_by: userInfo?.uid,
			created_at: dayjs().format('YYYY/MM/DD HH:mm:ss')
		});

		return true;
	} catch(e) {
		if (e instanceof FirebaseError) {
			console.log(e);
		}
	}
}

/**
 * チャットを登録
 * @param string メッセージ 
 * @returns チャットID
 */
export const postMessage = async (message = '') => {
	try {
		const userInfo = getCurrentUserInfo();
		if (userInfo == null){ return; }

		const docRef = await addDoc(collection(db, 'chat'), {
			message: message,
			uid: userInfo?.uid,
			created_at: dayjs().format('YYYY/MM/DD HH:mm:ss')
		});

		return docRef.id;
	} catch (e) {
		if (e instanceof FirebaseError) {
			console.log(e);
		}
	}
};

/**
 * チャット履歴をリアルタイムに取得
 * @returns 履歴取得停止
 */
export const onSnapshotMessages = () => {
    const q = query(
        collection(db, 'chat'),
        orderBy('created_at', 'desc'));
	const unsubscribe = onSnapshot(q, (querySnapshot) => {
        /**
         * @type {string[]}
         */
        let messages = [];
		querySnapshot.forEach((doc) => {
            const data = doc.data();
			messages.push(data.message);
		});
        SnapshotMessages.set(messages);
	});
    return unsubscribe;
};
