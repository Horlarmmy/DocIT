import { NFTStorage } from "https://cdn.jsdelivr.net/npm/nft.storage/dist/bundle.esm.min.js";
const endpoint = 'https://api.nft.storage'
const ContractAddress = "0x8E82985eE184B5a90fea68F3329B247e33f36fE5";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdjMTVkRTM4NUU0Mzc1M0RBODNGZUE0NjgzZkZhMzc4RTFjZTUyZjEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2ODk3NjUxMTc3NCwibmFtZSI6IkRvY1QifQ.t7bF1OuxuS6S9QMP_rfl72fYMneOa1jzs-mZhdjEhog";

var file;
var docs = [];

const abi = [
    "function addDoc(string memory uri) public returns (uint256)",
    "function getdocuments() public view returns(string[] memory)",
    "function sendDoc(address _receiver, uint256 tokenId)"
]

var file_url;
const handleChange = async(e) => {
    file = document.getElementById("file")?.files[0];
}
document.getElementById("file")?.addEventListener("change", () => handleChange());

const getContract = async() => {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum); // A connection to the Ethereum network
        var signer = await provider.getSigner(); // Holds your private key and can sign things
        var current_address = await signer.getAddress(); // Set the current address
        const Contract = new ethers.Contract(
            ContractAddress,
          abi,
          signer
         );
        return Contract;
      } else {
        alert("No wallet detected");
      }
}


const addFile = async() => {
    if (file ) {
    const DoctContract = await getContract();
    const storage = new NFTStorage({ endpoint, token });
    const doc_metadata = await storage.store({
        name: file.name,
        description: file.name,
        image: file
    });
    console.log(doc_metadata.url);
    var tx = await DoctContract.addDoc(doc_metadata.url);
    await tx.wait();
    window.alert("Your file has been uploaded!!!");
    }

}

let num = 1;
const displayFile = async() => {
    if (window.ethereum) {
        const DoctContract = await getContract();
        docs = await DoctContract.getdocuments();
            for (let i = 0; i < docs.length; i++) {
                if (num < 7) {
                console.log(docs[i]);
                const url_d = "https://ipfs.io/ipfs/" + (docs[i]).slice(6);
                console.log(url_d);
                const doc_meta = await fetch(url_d)
                .then(function (response) {
                    return  response.json();
                });
                const container = document.querySelector(".docs-s");
                const docs_v = document.createElement("div");
                console.log(doc_meta);
                file_url = "https://ipfs.io/ipfs/" + (doc_meta.image).slice(6);
                docs_v.innerHTML = num + ". &emsp; " + doc_meta.name + " &emsp; &emsp; &emsp; <a href='" + file_url +"'>View</a> &emsp; &emsp; <a href=#>Send</a>";
                container.append(docs_v);
                num++;
                }
              }
    }
}

document.getElementById("upload_file")?.addEventListener("click", () => addFile());
document.getElementById("refresh")?.addEventListener("click", () => displayFile());