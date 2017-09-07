import { Injectable } from '@angular/core';
@Injectable()
export class GuestBookService{
 
    private data: any;
    private nodeById: any;

    constructor(){
        this.data = [
{"id":"1","uid":"0","uname":"Вася","date":"2017-09-07 12:55","mess":"Однажды в студёную зимнюю пору...","parent":"0"},
{"id":"2","uid":"1","uname":"Петя","date":"2017-09-07 12:56","mess":"Однажды в студёную зимнюю пору...","parent":"0"},
{"id":"3","uid":"2","uname":"Коля","date":"2017-09-07 13:05","mess":"Однажды в студёную зимнюю пору...","parent":"0"},
{"id":"4","uid":"0","uname":"Миша","date":"2017-09-07 13:15","mess":"Однажды в студёную зимнюю пору...","parent":"0"},
{"id":"5","uid":"0","uname":"Лёша","date":"2017-09-07 13:19","mess":"Однажды в студёную зимнюю пору...","parent":"2"},
{"id":"6","uid":"3","uname":"Юля","date":"2017-09-07 13:25","mess":"Однажды в студёную зимнюю пору...","parent":"2"}

];
    }
    getData(): any {
        console.log(this.data);
        return this.data;
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

    toggleCheck(id:number){
        let check = this.getNodeById(id).check;
        this.nodeById.check = !check;
    }
    toggleCollapsed(id:number){
        let collapsed = this.getNodeById(id).collapsed;
        this.nodeById.collapsed = !collapsed;
    }
}