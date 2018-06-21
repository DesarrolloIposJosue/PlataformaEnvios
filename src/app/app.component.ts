import { Component, OnInit } from '@angular/core';
import { ClientService } from './services/client-service/client.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  title = 'app';

  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    public clientService: ClientService,
    private _actRouter: ActivatedRoute,
    private _router: Router
  ) {

  }

  ngOnInit() {
        
    }
      // sets an idle timeout of 280 seconds, for testing purposes.
    /*idle.setIdle(10);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(20);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
      console.log("Lo reinicio?");
    });

    idle.onTimeout.subscribe(() => {
      console.log("Se acabo el tiempo prro");
      this.idleState = 'Timed out!';
      this.timedOut = true;
      clientService.logOut();
      this._router.navigate(['/log-in']);
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!';
      console.log("Holis");
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      console.log("Te voa sacar prro");
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }*/

}
