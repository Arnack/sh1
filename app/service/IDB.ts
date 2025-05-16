import localforage from 'localforage';

class IDB {
    private static instance: IDB;
    private store: LocalForage;

    private constructor() {
        this.store = localforage.createInstance({
            name: 'webprojectmate',
            storeName: 'app_data',
            description: 'Application data storage'
        });
    }

    static getInstance(): IDB {
        if (!IDB.instance) {
            IDB.instance = new IDB();
        }
        return IDB.instance;
    }

    async setItem<T>(key: string, value: T): Promise<T> {
        try {
            await this.store.setItem(key, value);
            return value;
        } catch (error) {
            console.error('Error setting item in IndexedDB:', error);
            throw error;
        }
    }

    async getItem<T>(key: string): Promise<T | null> {
        try {
            return await this.store.getItem<T>(key);
        } catch (error) {
            console.error('Error getting item from IndexedDB:', error);
            return null;
        }
    }

    async removeItem(key: string): Promise<void> {
        try {
            await this.store.removeItem(key);
        } catch (error) {
            console.error('Error removing item from IndexedDB:', error);
            throw error;
        }
    }

    async clear(): Promise<void> {
        try {
            await this.store.clear();
        } catch (error) {
            console.error('Error clearing IndexedDB:', error);
            throw error;
        }
    }

    async keys(): Promise<string[]> {
        try {
            return await this.store.keys();
        } catch (error) {
            console.error('Error getting keys from IndexedDB:', error);
            return [];
        }
    }

    async length(): Promise<number> {
        try {
            return await this.store.length();
        } catch (error) {
            console.error('Error getting length of IndexedDB:', error);
            return 0;
        }
    }
}

export default IDB; 