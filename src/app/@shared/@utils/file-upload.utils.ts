import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { IBankData } from '@interfaces/bank-data.interface';
import { expectedBankFiles } from './misc.utils';

export const onFilesDropped = (firestore: Firestore, files: FileList): void => {
    Array.from(files).forEach((file) => {
        const reader = new FileReader();
        const fileName = file.name.toLowerCase();
        if (!expectedBankFiles.includes(fileName)) {
            throw new Error(`Invalid file name: ${fileName}. Expected one of: ${expectedBankFiles.join(', ')}`);
        }

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
