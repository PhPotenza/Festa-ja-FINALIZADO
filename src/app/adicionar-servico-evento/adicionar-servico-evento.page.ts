import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-adicionar-servico-evento',
  templateUrl: './adicionar-servico-evento.page.html',
  styleUrls: ['./adicionar-servico-evento.page.scss'],
})
export class AdicionarServicoEventoPage implements OnInit {

  anggota: any;
  eventos: any = [];
  idService:number;
  idEvento: number;
  idUsuario: number;
  limit: number = 13;
  start: number = 0;

  constructor(
    private router: Router,
  	private postPvdr: PostProvider,
    private storage: Storage,
    public toastCtrl: ToastController,
    private actRoute: ActivatedRoute,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('session_storage').then((res)=>{
      this.anggota = res;
      this.idUsuario = this.anggota.idUsuario;
      console.log(res);
    });
    this.eventos = [];
    this.start = 0;
    this.loadEvento();
    
    this.storage.get('session_storage_servico').then((res)=>{
      this.anggota = res;
      this.idService = this.anggota.idService;
      console.log(res);

      this.storage.get('session_storage2').then((res)=>{
        this.anggota = res;
        this.idEvento = this.anggota.idEvento;
        console.log(res);
      });
    });
  }

  loadEvento(){
  	return new Promise(resolve => {
      this.storage.get('session_storage').then((res)=>{
        this.anggota = res;
        this.idUsuario = this.anggota.idUsuario;
        let body = {
          idUsuario: this.idUsuario,
          idEvento: this.idEvento,
          limit : this.limit,
  			  start : this.start,
          aksi : 'getevento',
        };
  
        this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
          for(let evento of data.result){
            this.eventos.push(evento);
          }
          resolve(true);
        });
      });
      });
  	
  }

  loadData(event:any){
    this.start += this.limit;
  	setTimeout(() =>{
  	this.loadEvento().then(()=>{
  		event.target.complete();
  	});
  	}, 500);
  }

  formListaServico(id){
    this.actRoute.params.subscribe((data: any) =>{
    this.idEvento = data.id;
    this.router.navigate(['/servicos-contratados/' + id]);
      });
}


  }