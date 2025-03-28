import AsyncStorage from '@react-native-async-storage/async-storage';

interface AnalysisRequest {
  filePath: string;
  code: string;
  timestamp: number;
}

export class AnalysisQueue {
  private static readonly STORAGE_KEY = 'pending_analyses';

  static async processQueue() {
    const pending = await this.getPending();
    while (pending.length > 0) {
      const request = pending.shift()!;
      try {
        await this.sendToAPI(request);
        await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(pending));
      } catch (error) {
        console.error('Offline save failed', error);
        await AsyncStorage.setItem(this.STORAGE_KEY, 
          JSON.stringify([request, ...pending]));
      }
    }
  }

  private static async sendToAPI(request: AnalysisRequest) {
    // API call implementation
  }
}