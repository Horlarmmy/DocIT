import { NFTStorage } from "https://cdn.jsdelivr.net/npm/nft.storage/dist/bundle.esm.min.js";
const endpoint = 'https://api.nft.storage'
const ContractAddress = "";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdjMTVkRTM4NUU0Mzc1M0RBODNGZUE0NjgzZkZhMzc4RTFjZTUyZjEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2ODk3NjUxMTc3NCwibmFtZSI6IkRvY1QifQ.t7bF1OuxuS6S9QMP_rfl72fYMneOa1jzs-mZhdjEhog";

var file;
var docs = [];

var file_url;
const handleChange = async(e) => {
    file = document.getElementById("file")?.files[0];
}
document.getElementById("file")?.addEventListener("change", () => handleChange());

const getContract = async() => {
    if (window.ethereum) {
        await window.ethereum.enable(); // Enable the Ethereum client
        provider = new ethers.providers.Web3Provider(window.ethereum); // A connection to the Ethereum network
        signer = provider.getSigner(); // Holds your private key and can sign things
        current_address = await signer.getAddress(); // Set the current address
        DoctContract = new ethers.Contract(
            ContractAddress,
          abi,
          signer
         );
      } else {
        alert("No wallet detected");
      }
}


const addFile = async() => {
    if (file ) {
    await getContract();
    const storage = new NFTStorage({ endpoint, token });
    const doc_metadata = await storage.store({
        name: file.name,
        description: file.name,
        image: file
    });
    console.log(doc_metadata.url);
    tx = await DoctContract.addDoc(doc_metadata.url);
    await tx.wait()
    file_url = doc_metadata.data.image.href;
    window.alert("Your file has been uploaded!!!");
    }

}

let num = 1;
const displayFile = async() => {
    if (window.ethereum) {
        await getContract();
        docs = await DoctContract.getgetdocuments();
            for (let i = 0; i < docs.length; i++) {
                if (num < 7) {
                const container = document.querySelector(".docs-s");
                const docs_v = document.createElement("div");
                console.log(docs[i])
                docs_v.innerHTML = num + ". &emsp; " + docs[i] + " &emsp; &emsp; &emsp; <a href=/'" + file_url +"/'>View</a>";
                container.append(docs_v);
                num++;
                }
              }
    }
}

document.getElementById("upload_file")?.addEventListener("click", () => addFile());
document.getElementById("refresh")?.addEventListener("click", () => displayFile());