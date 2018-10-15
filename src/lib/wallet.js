const randomBytes = require('randombytes')
const BigInteger = require('bigi')
const ecurve = require('ecurve')
/*const asn1 = require('asn1.js');
const BN = require('bn.js');
"asn1":"0.2.3",
	"bn": "1.0.1"
*/
const crypto = require('crypto')
const cs = require('coinstring')
const bs58 = require('bs58')
const nuls_request = require("./request")
const CryptoJS = require('crypto-js')
const sha256 = require('sha256') 
var rs = require('jsrsasign')

const iv =  CryptoJS.enc.Hex.parse('0000000000000000');
function g(data){
  return {"success":true,"code":10000,data:data};
}
function e(){
  return {"success":arguments[0]||false,"code":arguments[1]||"","msg":arguments[2]||""};
}

//获取公钥
function getPub(randombytes){
	var secp256k1 = ecurve.getCurveByName('secp256k1')
	//var randombytes = randomBytes(32).toString('hex')
	//var privateKey = new Buffer('31895853c2cfbe46c4c4916e5a7f40a70e21ba8e19bd0b7a8cc206cbd181f04d', 'hex');
	var privateKey = new Buffer(randombytes, 'hex')
	var ecparams = ecurve.getCurveByName('secp256k1')
	var curvePt = ecparams.G.multiply(BigInteger.fromBuffer(privateKey))
	var x = curvePt.affineX.toBuffer(32)
	var y = curvePt.affineY.toBuffer(32)
	var publicKey = Buffer.concat([new Buffer([0x04]), x, y])
	publicKey = curvePt.getEncoded(true)
	return publicKey.toString('hex');
}
//解密私钥
function decodePrivateKey(param){
	let key = CryptoJS.enc.Hex.parse(sha256(param.pass));
	let encryptedHexStr = CryptoJS.enc.Hex.parse(param.pri);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
	let decrypt = CryptoJS.AES.decrypt(srcs, key, { 
		iv: iv, 
		mode: CryptoJS.mode.CBC, 
		padding: CryptoJS.pad.Pkcs7 
	});
	return decrypt.toString().toLowerCase();
}

module.exports = {
	//生成公私钥对，私钥备份，公钥提交到后台生成地址
	getPriAndPub:function(callback,param){
		var keys = {};
		var secp256k1 = ecurve.getCurveByName('secp256k1')
		var randombytes = randomBytes(32).toString('hex')
		var privateKey = new Buffer(randombytes, 'hex')
		keys['pri'] = privateKey.toString('hex')
		keys['pub'] = getPub(randombytes);
		callback(nuls_request.g(keys));
	},
	/*根据私钥，导入钱包，返回地址*/
	saveAddressByPri: function(callback,param){
		callback(nuls_request.g("Nse8tUipkGVhtmuLBufUPjAVcwZcbyGT"));
	},
	/*根据私钥，获取公钥*/
	getPublicKeyByprivateKey: function(pri){
		if(pri){
			return getPub(pri);
		}else{
			return "0";
		}
	},
	//加密私钥
	encryptedPrivateKey: function(param){
		let key = CryptoJS.enc.Hex.parse(sha256(param.pass));
		let srcs = CryptoJS.enc.Hex.parse(param.pri);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, { 
			iv: iv, 
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
        return encrypted.ciphertext.toString().toLowerCase();
		
	},
	//根据密码解密私钥
	decodePriByPass: function(param){
		return decodePrivateKey(param);
	},
	//签名
	signTrans: function(param){
		
		/*参与签名的需要去掉0200*/
		var result = "";
		var hash = param.hash.substring(4,param.hash.length);
		var pri = param.pri;
		var pub = param.pub;
		//hash = new Buffer(hash,'hex');
		var ec = new rs.KJUR.crypto.ECDSA({'curve': 'secp256k1'});
		var signValue = ec.signHex(hash, pri);
		var xsize = pub.length/2;
		xsize = xsize.toString(16);
		result += xsize;
		result += pub;
		xsize = signValue.length/2;
		xsize = xsize.toString(16);
		result += "00";
		result += xsize;
		result += signValue;
		return result;
		//return pub+signValue;
		
		//pub = new Buffer(pub,'hex');

		//var prvkey = f1.prvkey1.value;     pri
		//var curve = f1.curve1.value;       secp256r1
		//var sigalg = f1.sigalg1.value;     SHA256withECDSA
		//var msg1 = f1.msg1.value;          hash

		/*var sig = new rs.KJUR.crypto.Signature({"alg": "SHA256withECDSA"});
		sig.init({d: pri, curve: "secp256r1"});
		sig.updateString(hash);
		var sigValueHex = sig.sign()
		//console.log(sigValueHex);
		console.log(sigValueHex);
		pri = new Buffer(pri,'hex');*/
		
		
		/*
		var rsa = new rs.RSAKey();
		rsa = rs.KEYUTIL.getKey(pri);
		const sig = new rs.KJUR.crypto.ECDSA();
		sig.init(rsa);
		sig.updateString(hash);
		console.log(sig.sign());
		var sign = rs.hextob64(sig.sign());
		new Buffer();
		console.log(sign);
		return sign;
		//pub 02aebfd858ef5c5ea3999d1a3227c14baefc7d6cd67bb96746ba247e9d4face766
		*/
		//result 21 02aebfd858ef5c5ea3999d1a3227c14baefc7d6cd67bb96746ba247e9d4face766 0046 304402203b70e75c22223adb6750d891c5f6fa3c1411161dc33d5d19f2508400e7c0748002203bcfa3e98b01d285aabf35ef537db477db493ab524c28a248658e83ac68281ba
	}
}


