import { Component ,OnInit,Output, EventEmitter} from '@angular/core';
import { ResponseGenerateToken } from 'src/app/interfaces/response-generate-token';
import { GenerateTokenService } from 'src/app/services/generate-token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  responseToken!: ResponseGenerateToken

constructor(private tokenGenerate: GenerateTokenService){

}
  ngOnInit(): void {
    this.generateToken();
  }
generateToken(){
  this.tokenGenerate.generate().subscribe({
    next: (response) => {
      this.responseToken = response
      console.log(response)
      const time = response.expiresIn - (Date.now() / 1000)
       console.log(time, "time")
    },
    error: (error) => {
      console.log(error)
    }
  })
}

}
