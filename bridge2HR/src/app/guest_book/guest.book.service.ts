import { Injectable } from '@angular/core';

@Injectable()
export class GuestBookService{
 
    private data: any;
    private nodeById: any;
    public currentAnswer: string = "0";
    public currentAnswerMess: string;
    public timeoutSendMess = false;

    constructor(){
        // this.http = _http;
    }
    updateData(){
        this.data = [
{"id":"1","uid":"0","uname":"Вася","date":"2017-09-07 12:55","mess":"Однажды в студёную зимнюю пору...","parent":"0"},
{"id":"2","uid":"1","uname":"Петя","date":"2017-09-07 12:56","mess":"Однажды в студёную зимнюю пору...","parent":"0"},
{"id":"3","uid":"2","uname":"Коля","date":"2017-09-07 13:05","mess":"Однажды в студёную зимнюю пору...","parent":"0"},
{"id":"4","uid":"0","uname":"Миша","date":"2017-09-07 13:15","mess":"Однажды в студёную зимнюю пору...","parent":"0"},
{"id":"5","uid":"0","uname":"Лёша","date":"2017-09-07 13:19","mess":"Однажды в студёную зимнюю пору...","parent":"2"},
{"id":"6","uid":"3","uname":"Юля","date":"2017-09-07 13:25","mess":"Однажды в студёную зимнюю пору...","parent":"2"}];
        //console.log('22 updateData', this.data);
    }
    getData(): any {
        //console.log('getData', this.data);
        return this.data;
    }

    pushMess(parent: string, uid: string, uname: string, date: string, mess: string){
        //заглушка, на самом деле здесь отправка данных на сервер и id возвращается оттуда
        let maxId = -1;
        for(let i in this.data){
            console.log(this.data[i].id);
            maxId = (maxId > (this.data[i].id as number)) ? maxId : (this.data[i].id as number);
        }
        maxId++;

        this.addMess({"id":maxId.toString(),"uid":uid,"uname":uname,"date":date,"mess":mess,"parent":parent});
        // let tmpData = [];
        // for(let i in this.data){
        //     tmpData.push(this.data[i]);
        // }
        // tmpData.push({"id":maxId.toString(),"uid":uid,"uname":uname,"date":date,"mess":mess,"parent":parent});
        // this.data = tmpData;
        console.log('pushMess', this.data);
    }
    addMess(mess: any){
        let tmpData = [];
        for(let i in this.data){
            tmpData.push(this.data[i]);
        }
        tmpData.push(mess);
        this.data = tmpData;
    }

    changeMess(id: string, mess: string){
        //заглушка
        for(let i in this.data){
            if(this.data[i].id == id){
                this.data[i].mess = mess;
                return true;
            }
        }
        return false;
    }
    
    getNodeById(id:number):any{
        this.treeTraversal(id, this.data);
        return this.nodeById;
    }
    treeTraversal(id: number, nodes: any){
        for(let i in nodes){
            if(nodes[i].id == id){
                this.nodeById = nodes[i];
            }else{
                this.treeTraversal(id, nodes[i].nodes);
            }
        }
    }
}