import { ResponseGenerateToken } from 'src/app/interfaces/response-generate-token';
import { Component, Input, AfterViewInit, AfterViewChecked, EventEmitter, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GenerateTokenService } from 'src/app/services/generate-token.service';
import {interval, Subscription} from 'rxjs'
@Component({
  selector: 'app-card-token',
  templateUrl: './card-token.component.html',
  styleUrls: ['./card-token.component.css'],


})
export class CardTokenComponent implements AfterViewInit{
  @Output() eventGenerateToken = new EventEmitter();
  constructor(private tokenGenerate: GenerateTokenService){

  }
  ngAfterViewInit(): void {
    this.newToken()
  }


  @Input() token!: ResponseGenerateToken
  tokenTime!: number;
private intervalSub!: Subscription;
  newToken(){

   this.intervalSub = interval(1).subscribe(() => {
      if(this.token){
        this.tokenTime = parseFloat((this.token.expiresIn - (Date.now() / 1000)).toFixed(1))
        if(this.tokenTime <= 0){
          this.eventGenerateToken.emit()

        }

      }
    })
  }

  pauseInterval(){
   this.intervalSub.unsubscribe();
  }
}
