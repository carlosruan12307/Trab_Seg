import { Component, AfterViewInit, ViewChild, ElementRef,OnInit, Renderer2 } from '@angular/core';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements AfterViewInit{
valueFromModel!: boolean;
  constructor(private renderer: Renderer2, private tokenService: TokenService){


  }
  ngAfterViewInit(): void {
   document.getElementById('yep')?.click()
  }
  getValueResponse(){
    console.log(this.tokenService.response)
this.valueFromModel = this.tokenService.response;

  }

}
