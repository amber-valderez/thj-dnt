import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { IBankData } from '@interfaces/bank-data.interface';

export const onFilesDropped = (firestore: Firestore, files: FileList): void => {
    Array.from(files).forEach((file) => {
        const reader = new FileReader();
        const fileName = file.name.toLowerCase();
        reader.onload = async () => {
            const bankData: IBankData = {
                name: fileName,
                data: reader.result,
                date: new Date().toISOString(),
            };
            await setDoc(doc(firestore, 'items', fileName), bankData);
        };
        reader.readAsText(file);
    });
};
