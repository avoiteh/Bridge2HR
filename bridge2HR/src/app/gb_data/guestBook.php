<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization");

class guestBook{
	private $data;
	function __construct (){
		$json = json_decode(file_get_contents('php://input'));
		// if(isset($_POST['query'])){
		// 	$query = $_POST['query'];
		// }else{
		// 	$query='';
		// }
		$this->loadFtomXML();
		if($json){
			foreach ($this->data as $key => $value) {
				if($value->id == $json->id){
					//если такой id нашёлся, значит надо сохранить
					$this->data[$key]->mess = $json->mess;
					$this->saveToXML();
					die('[{"id":"'.$value->id.'"}]');
				}
			}
			// $max_id++;
			// //id не нашёлся, значит надо добавить!
			// $json->id = $max_id;
			
			$s='';
			foreach ($this->data as $key => $value) {
				$s.=serialize($value)."\n";
			}
			file_put_contents('test.txt', $s);

			$this->data[]=$json;

			$this->saveToXML();
			die('[{"newId":"'.$json->id.'"}]');
		}else{
			echo json_encode($this->data);
		}
	}
	function loadFtomXML(){
		$xml = simplexml_load_string(file_get_contents('xmlData.xml'));
		$json = json_decode(json_encode($xml));
		$this->data = $json->message;
	}
	function saveToXML(){
		$string = "<?xml version='1.0'?> 
<messages>";
foreach ($this->data as $key => $value) {
	$string .= "<message>
	<id>$value->id</id>
	<uid>$value->uid</uid>
	<uname>$value->uname</uname>
	<date>$value->date</date>
	<mess>$value->mess</mess>
	<parent>$value->parent</parent>
</message>
";
		}
		$string .= "</messages>";
		file_put_contents('xmlData.xml', $string);
	}
}
new guestBook();
?>