// import React from "react";
import CartItem from "./CartItem";
import Cart from "./Cart";
import Navbar from "./Navbar";
import React from "react";
// import { collection, getDocs } from 'firebase/firestore';
// import {db} from './index.js'


import {
  doc,
  setDoc,
  collection,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
   addDoc,
} from "firebase/firestore";
import { db } from "./index";




 
class App extends React.Component {
  constructor () {
    super();
    this.state = {
      Products: [],
      loading: true
    }
   // db = firebase.firestore();
   
  }
  //  getCities=async()=> {
  //   console.log("before");
  //  const citiesCol = collection(db, 'Products');
  //   console.log(citiesCol);
  //   const citySnapshot = await getDocs(citiesCol);
  //   const cityList = citySnapshot.docs.map(doc => doc.data());
  //   console.log(cityList);
  //   this.setState({ cityList: cityList});  }
 
  //function to change 
 async componentDidMount() {
  //this is a realtime listener if you change anything in firebase ui will automatically updated 
     const q = query(
       collection(db, "Products"),
        where("price", ">", 0),
      //  orderBy("price")
     );
     const unsub = await onSnapshot(q, (querySnapshot) => {
       const getProducts = [];
       querySnapshot.forEach((doc) => {
         const Product = doc.data();
         Product.id = doc.id;
         getProducts.push(Product);
       });
       console.log(getProducts);
       this.setState({ Products: getProducts, loading: false });
     });
   }

  handleIncreaseQuantity = (Product) => {
    console.log('Heyy please inc the qty of ', Product);
    const { Products } = this.state;
    const index = Products.indexOf(Product);

    // Products[index].qty += 1;

    // this.setState({
    //   Products
    // })
    console.log(db);
    console.log(this.db);
    //const docRef = db.collection("Products").doc(Products[index].id);
    const docRef = doc(collection(db, "Products"), Products[index].id);

    
      updateDoc(docRef,{ qty: Products[index].qty + 1 })
      .then(() => {
        console.log("Document updated sucessfully");
      })
      .catch(error => {
        console.log(error);
      });
  }


  handleDecreaseQuantity = (Product) => {
    console.log('Heyy please dec the qty of ', Product);
   
    const { Products } = this.state;
   
    const index = Products.indexOf(Product);
    // if(Products[index].qty===0)
    // {
    //     return;
    // }
    // Products[index].qty -= 1;

    // this.setState({
    //   Products
    // })

    const docRef = doc(collection(db, "Products"), Products[index].id);

    
    updateDoc(docRef,{ qty: Products[index].qty - 1 })
    .then(() => {
      console.log("Document updated sucessfully");
    })
    .catch(error => {
      console.log(error);
    });
  }


  handleDeleteProduct = (id) => {
    const { Products } = this.state;

    // const items = Products.filter((item) => item.id !== id); // [{}]

    // this.setState({
    //   Products: items
    // })
    const docRef = doc(collection(db, "Products"), id);
    deleteDoc(docRef,id)
    
    .then(() => {
      console.log("Document updated sucessfully");
    })
    .catch(error => {
      console.log(error);
    });
   
  }
  getCartCount = () => {
    const { Products } = this.state;

    let count = 0;

    Products.forEach((Product) => {
      count += Product.qty;
    })

    return count;
  }
  getCartTotal = () => {
    const { Products } = this.state;

    let cartTotal = 0;

    Products.map((Product) => {
      cartTotal = cartTotal + Product.qty * Product.price
    })

    return cartTotal;
  }
  // addProduct = () => {
  //   this.db
  //     .collection("Products")
  //     .add({
  //       img: "",
  //       price: 900,
  //       qty: 3,
  //       title: "Washing Machine"
  //     })
  //     .then(docRef => {
  //       docRef.get().then(snapshot => {
  //         console.log("Product has been added", snapshot.data());
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };
 
  addProduct = async () => {
    const docRef = await addDoc(collection(db, "Products"), {
      img: "",
      price: 900,
      qty: 2,
      title: "Washing Machine"
    })
      .then((docRef) => {
        console.log("product added" + docRef);
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  };
  

    render(){
      const {Products,loading }=this.state;
    return (
      <div className="App">
    <Navbar count= {this.getCartCount()}/>
    {/* <button onClick={this.addProduct} style={{ padding: 20, fontSize: 20 }}>
            Add a Product
          </button> */}
    <Cart
            Products={Products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
    />
        {loading && <h1>Loading your Cart!!!</h1>}
      <div style={ {background: '#4267b2', padding: 10, fontSize: 20} }>TOTAL: {this.getCartTotal()} </div>
        </div>
    );
    }
  }

export default App;
