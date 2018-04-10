import { Injectable } from '@angular/core';
import { ClientService } from '../client-service/client.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AutoLogOutService {
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    public clientService: ClientService,
    private _actRouter: ActivatedRoute,
    private _router: Router
  ) {
    idle.setIdle(360);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(60);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
    });

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      clientService.logOut();
      this._router.navigate(['/log-in']);
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!';
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(30);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  stop(){
    this.idleState = 'Timed out!';
    this.timedOut = true;
  }
}
