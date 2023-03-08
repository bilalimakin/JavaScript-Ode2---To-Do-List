/*
    ODEV-2 / YAPILACAKALR LİSTESİ
    # Listeye boşluk ve boş karekter eklenmiyor kodu 
    # Element eklemeyi sağlayan Fonksiyonlar Oluştur
    # Element Silmeyi sağlayan Fonksiyonlar oluştur
    # Yapıldı İşaretlenmesini sağlayan fonksiyon oluştur
    # Uyarı mesajı veya Bilgi Mesejı  ver  
 */

// indexte belirtilen ve ekle butonunun click eventi için tanımlanan newElement fonksiyonuna bakalım
function newElement(){

    //ilk olarak kullanıcıdan gelecek olan input değerine ulaşmamız gerekir
    var inputValue = document.getElementById("task").value;

        //bu inputun koşula uygun olup olmadığını kontrol edebilmemiz için if bloğu oluşturalım. Hiç bir şey girilmezse; 
        if(inputValue == ''){
            $(".error").toast('show'); //her iki durumda da gizli olan error toast alertleri gösteriyoruz. Boostrapin sitesinde bu koda ulaşabilirsiniz. Websitesinde hazır olarak verilmiş. 
        }
        //Kullanıcı space karakter girdiyse bunun için ayrı bir fonksiyonumuz var
        else if(isEmpty(inputValue)==true){
            $(".error").toast('show');
        }
        else{
            var listElement = document.createElement("li"); //liste elemanımızı oluşturduk
            eventListElement(listElement); //oluşan liste elemanına üzerine tıklandığında üstü çizili olsun vs. özelliklerini atadık
            listElement.innerHTML = inputValue; //textine dışarıdan gelen değeri atadık
            document.getElementById("list").appendChild(listElement);
            listElement.appendChild(createDeleteButton()); //child elementi tanımladığımız buton olsun dedik
            resetInput(); //sıfırladık
            $(".success").toast('show'); //success toast gösterebiliriz artık :)
            localStorage.setItem('inputValue', inputValue); //girilen son elemanın local storage da tutulması
            
            console.log(inputValue)
        }
}

//value bilgimiziçin boşluklarını silip karekter içerip içermediğine bakan bir fonsiyon üretelim
function isEmpty(s) {
    if(!s.trim().length){
        return true; //string ifadeyi trimlediğimizde yani boşluklarından arındırdığımızda uzunluğu olmuyorsa karakter içermiyordur. 
    } 
}

//kullanıcın değer girdiği input, ekleme yapıldıktan sonra sıfırlansın
function resetInput(){
    document.getElementById("task").value = "";
}


/*mevcuttaki li elementleri için tıklandığında değişeceği bir event ekleyelim. 
Css'e mavi ve üstü çizili gibi özellikleri barındıran class ekledik. Adı checked olsun.*/
var listItems = document.querySelectorAll("li"); // li etiketlerimizi seçtik
listItems.forEach(item => item.addEventListener('click', function(){// li etiketlerimize bir click olayı ekledik
    if(item.classList.contains('checked')){// li etiketimiz tıklanmış ise
        item.classList.remove('checked');// li etiketinin tıklamasınıveya işaretlenmesini kaldır.
    }
    else{
        item.classList.add('checked');// değil ise işaretlenmesini istedik
    }
}))

// aynı özelliği yeni eklenen liste elemanına atayan bir fonksiyon tanımlayalım
function eventListElement(listElement){   
    listElement.addEventListener('click', function(){
        if(listElement.classList.contains('checked')){
            listElement.classList.remove('checked');
        }
        else{
            listElement.classList.add('checked');
        }
    })
    return listElement;
} 


//her liste elemanı eklendiğinde bir silme butonu üretilsin
function createDeleteButton(){
    var img= new Image(); // image fonksiyonu oluştur bunu img değişkenine atadık
    img.src = "kapat.png" // resmimizi seçiyoruz
    img.width = 20; // genişliğini belirtiyoruz
    img.style = "float:right"; //  en sağa hizalanmasını belirtiyoruz
    img.addEventListener('click', function(){ //butonun click eventi olsun, tıklandığında parentelementini silsin
        var deletedListElement = this.parentElement;// img elemenın bulunduğu li mizi gösteriyoruz
        deletedListElement.remove();// kaldırma fonksiyonumuz
    })
    return img;
}

//mevcutta var olan list elemanları için click  eventi için sil fonksiyonu  oluşturalım 
var crossElements = document.querySelectorAll("img"); // dökümanın img elementlerini seçelim
crossElements.forEach(element => element.addEventListener('click', function(){ //bu elementlerinin hepsine click özelliği tanıtalım
var parentListItem = element.parentElement;
parentListItem.remove();// remove() fonsiyonu ile tıklanılan her img elementi kaldıralım
})
)