import { doc, collection, addDoc, query, onSnapshot, orderBy, getDocs } from 'firebase/firestore';
import { db, getCurrentUserInfo } from './firebase';
import dayjs from 'dayjs';
import { FirebaseError } from 'firebase/app';
import { SnapshotMessages } from './store';

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
