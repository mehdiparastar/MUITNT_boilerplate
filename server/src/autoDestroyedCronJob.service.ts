import { Injectable } from '@nestjs/common';
import { CronJob } from 'cron';

@Injectable()
export class AutoDestroyedCronService {
  private cronJob: CronJob;
  private timeoutValue: number;

  constructor(private readonly runTask: () => Promise<void>, timeoutValue: number) {
    this.timeoutValue = timeoutValue;

    this.cronJob = new CronJob('* * * * * *', async () => {
      try {
        await this.runTask(); // Call the provided async function
      } catch (error) {
        console.error('Error executing the task:', error);
      }
    });

    this.cronJob.start();

    // Schedule the closure of this instance after the specified timeout
    setTimeout(() => {
      this.closeInstance();
    }, this.timeoutValue);
  }

  private closeInstance() {
    // Clean up resources or perform any necessary cleanup actions here
    this.cronJob.stop();
    console.log('Cron job instance closed.');
  }
}
