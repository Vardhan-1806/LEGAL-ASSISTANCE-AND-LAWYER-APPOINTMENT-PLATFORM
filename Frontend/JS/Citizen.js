function showSection(id){
document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
document.getElementById(id).classList.add('active');
}

function searchLawyer(){
let val=lawyerSearch.value.toLowerCase();
document.querySelectorAll("#lawyerTable tr").forEach((r,i)=>{
if(i===0)return;
r.style.display=r.innerText.toLowerCase().includes(val)?"":"none";
});
}

function searchCase(){
let val=caseSearch.value.toLowerCase();
document.querySelectorAll("#caseTable tr").forEach((r,i)=>{
if(i===0)return;
r.style.display=r.innerText.toLowerCase().includes(val)?"":"none";
});
}

function sendMessage(){
let input=chatInput;
if(!input.value)return;
chatBox.innerHTML+=`<div class="msg user">${input.value}</div>`;
chatBox.innerHTML+=`<div class="msg bot">Lawyer will respond shortly.</div>`;
input.value="";
chatBox.scrollTop=chatBox.scrollHeight;
}

function analyzeDoc(){
let file=document.getElementById("docFile").files.length;
if(!file){alert("⚠ Please upload a document first.");return;}
docLoading.style.display="block";
docResultCard.style.display="none";
setTimeout(()=>{
docLoading.style.display="none";
docResultCard.style.display="block";
docType.innerText="Property Dispute Notice";
docPoints.innerHTML="<li>Ownership conflict</li><li>Legal notice issued</li>";
docInsight.innerText="This document indicates a legal property dispute.";
},1500);
}

function showCases(status){
showSection('cases');
let rows=document.querySelectorAll("#caseTable tr");
rows.forEach((row,i)=>{
if(i===0)return;
if(status==="all"){row.style.display="";}
else{row.style.display=row.innerText.includes(status)?"":"none";}
});
}

function showCaseDetails(row){
let c=row.getElementsByTagName("td");
d_id.innerText=c[0].innerText;
d_case.innerText=c[1].innerText;
d_lawyer.innerText=c[2].innerText;
d_status.innerText=c[3].innerText;
d_date.innerText=c[4].innerText;
d_place.innerText=c[5].innerText;
d_desc.innerText="This case involves legal proceedings regarding "+c[1].innerText+". Please attend court.";
caseDetailsBox.style.display="block";
}

function bookLawyer(name){
bookingMsg.innerText="Your appointment request has been sent to Adv. "+name+".";
bookingAlert.style.display="flex";
}

function closeAlert(){
bookingAlert.style.display="none";
}
function logout() {

    let confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {
        alert("Logged out successfully!");
        
        // Redirect to login page
        window.location.href = "login.html"; 
        
        // If you don’t have login page yet,
        // you can use this instead:
        // window.location.reload();
    }
}