import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy as firestoreOrderBy,
  query as firestoreQuery,
} from "firebase/firestore";

  import { db } from "./firebase";

  const TABLE = "offers";

  export const getOffers = async () => {
    const imagesCollection = collection(db, TABLE);
    // const queryy = query(imagesCollection, orderBy("title", "desc"));
    const snapshot = await getDocs(imagesCollection);
  
    const getOffers = snapshot.docs.map((doc) => {
      const id = doc.id;
      const image = doc.data();
      return {
        id: id,
        title: image.title,
        description: image.description,
        url: image.url
      };
    });
    return getOffers;
  };

  const CAMPAIGNS_TABLE = "campaigns";

  export const getCampaings = async () => {
    const cardsCollection = collection(db, CAMPAIGNS_TABLE);
    const snapshot = await getDocs(cardsCollection);
  
    const campaigns = snapshot.docs.map((doc) => {
      const id = doc.id;
      const campaign = doc.data();
      return {
        id: id,
        subtitle: campaign.subtitle,
        subtitleEN: campaign.subtitleEN,
        title: campaign.title,
        titleEN: campaign.titleEN,
        image: campaign.image,
        brandName: campaign.brandName,
      };
    });
    return campaigns;
  };

  export const getFilteredCampaigns= async (targetBrandName) => {
    const filteredCampaignsCollection = collection(db,  CAMPAIGNS_TABLE);
    const snapshot = await getDocs(filteredCampaignsCollection);
  
    const campaigns = snapshot.docs.map((doc) => {
      const id = doc.id;
      const campaign = doc.data();

      if (targetBrandName && campaign.brandName !== targetBrandName) {
        return null; 
      }
  
      return {
        id: id,
        subtitle: campaign.subtitle,
        title: campaign.title,
        image: campaign.image,
        brandName: campaign.brandName
      };
    });
  
    const filteredCampaigns = campaigns.filter(campaign => campaign !== null);
  
    return filteredCampaigns;
  };



  const PRODUCTS_TABLE = "products";

  export const getProducts = async () => {
    const productsCollection = collection(db, PRODUCTS_TABLE);
    const snapshot = await getDocs(productsCollection);
  
    const products = snapshot.docs.map((doc) => {
      const id = doc.id;
      const product = doc.data();
      return {
        id: id,
        image: product.image,
        title: product.title,
        subtitle: product.subtitle,
        oldPrice: product.oldPrice,
        price: product.price,
        discount: product.discount,
        color: product.color,
        category: product.category,
        gender: product.gender,
        size: product.size,
        brandName: product.brandName,
        createDate: product.createDate
      };
    });
    return products;
  };

  export const getFilteredProducts = async (targetBrandName) => {
    const productsCollection = collection(db, PRODUCTS_TABLE);
    const snapshot = await getDocs(productsCollection);
  
    const products = snapshot.docs.map((doc) => {
      const id = doc.id;
      const product = doc.data();

      if (targetBrandName && product.brandName !== targetBrandName) {
        return null; 
      }
  
      return {
        id: id,
        image: product.image,
        title: product.title,
        subtitle: product.subtitle,
        oldPrice: product.oldPrice,
        price: product.price,
        discount: product.discount,
        color: product.color,
        category: product.category,
        gender: product.gender,
        size: product.size,
        brandName: product.brandName,
        createDate: product.createDate
      };
    });
  
    const filteredProducts = products.filter(product => product !== null);
  
    return filteredProducts;
  };
  

  export const getProductsByHighestPrice = async () => {
    const productsCollection = collection(db, PRODUCTS_TABLE);
    const query = firestoreQuery(productsCollection, firestoreOrderBy('price', 'asc'));
    const snapshot = await getDocs(query);
  
    const products = snapshot.docs.map((doc) => {
      const id = doc.id;
      const product = doc.data();
      return {
        id: id,
        image: product.image,
        title: product.title,
        subtitle: product.subtitle,
        oldPrice: product.oldPrice,
        price: product.price,
        discount: product.discount,
        color: product.color,
        category: product.category,
        gender: product.gender,
        size: product.size,
        brandName: product.brandName,
        createDate: product.createDate,
      };
    });
    return products;
  };

  export const getProductsByLowestPrice = async () => {
    const productsCollection = collection(db, PRODUCTS_TABLE);
    const query = firestoreQuery(productsCollection, firestoreOrderBy('price', 'desc'));
    const snapshot = await getDocs(query);
  
    const products = snapshot.docs.map((doc) => {
      const id = doc.id;
      const product = doc.data();
      return {
        id: id,
        image: product.image,
        title: product.title,
        subtitle: product.subtitle,
        oldPrice: product.oldPrice,
        price: product.price,
        discount: product.discount,
        color: product.color,
        category: product.category,
        gender: product.gender,
        size: product.size,
        brandName: product.brandName,
        createDate: product.createDate,
      };
    });
    return products;
  };

  export const getProductsByLatestCreate = async () => {
    const productsCollection = collection(db, PRODUCTS_TABLE);
    const query = firestoreQuery(productsCollection, firestoreOrderBy('createDate', 'desc'));
    const snapshot = await getDocs(query);
  
    const products = snapshot.docs.map((doc) => {
      const id = doc.id;
      const product = doc.data();
      return {
        id: id,
        image: product.image,
        title: product.title,
        subtitle: product.subtitle,
        oldPrice: product.oldPrice,
        price: product.price,
        discount: product.discount,
        color: product.color,
        category: product.category,
        gender: product.gender,
        size: product.size,
        brandName: product.brandName,
        createDate: product.createDate,
      };
    });
    return products;
  };

  const CATEGORIES_TABLE = "categories";

  export const getCategories = async () => {
    const categoriesCollection = collection(db, CATEGORIES_TABLE );
    const snapshot = await getDocs(categoriesCollection);
  
    const categories = snapshot.docs.map((doc) => {
      const id = doc.id;
      const category = doc.data();
      return {
        id: id,
        name: category.name,
        url: category.url
      };
    });
    return categories;
  };

  const BRANDS_TABLE = "brands";

  export const getBrands = async () => {
    const brandsCollection = collection(db, BRANDS_TABLE );
    const snapshot = await getDocs(brandsCollection);
  
    const brands = snapshot.docs.map((doc) => {
      const id = doc.id;
      const brand = doc.data();
      return {
        id: id,
        address: brand.address,
        brandName: brand.brandName,
        latitude: brand.latitude,
        longitude: brand.longitude,
        phone: brand.phone,
        placeName: brand.placeName,
        url: brand.url,
        workHours: brand.workHours
      };
    });
    return brands;
  };

  const SHOPPING_TABLE = "shopping";

  export const getShopping = async () => {
    const shoppingCollection = collection(db, SHOPPING_TABLE );
    const snapshot = await getDocs(shoppingCollection);
  
    const shoppings = snapshot.docs.map((doc) => {
      const id = doc.id;
      const shopping = doc.data();
      return {
        id: id,
        title: shopping.title,
        titleEN: shopping.titleEN,
        description: shopping.description,
        descriptionEN: shopping.descriptionEN,
        price: shopping.price,
        priceEN: shopping.priceEN,
        url: shopping.url,
      };
    });
    return shoppings;
  };

  const SHOPPINGMIDDLECAROUSEL_TABLE = "shoppingMiddleCarousel";

  export const getShoppingMiddleCarousel = async () => {
    const shoppingMiddleCarouselCollection = collection(db, SHOPPINGMIDDLECAROUSEL_TABLE );
    const snapshot = await getDocs(shoppingMiddleCarouselCollection);
  
    const shoppingMiddleCarousels = snapshot.docs.map((doc) => {
      const id = doc.id;
      const shoppingMiddleCarousel = doc.data();
      return {
        id: id,
        title: shoppingMiddleCarousel.title,
        titleEN: shoppingMiddleCarousel.titleEN,
        url: shoppingMiddleCarousel.url
      };
    });
    return shoppingMiddleCarousels;
  };

  const PHONES_TABLE = "phones";

  export const getPhones = async () => {
    const phonesCollection = collection(db, PHONES_TABLE );
    const snapshot = await getDocs(phonesCollection);
  
    const phones = snapshot.docs.map((doc) => {
      const id = doc.id;
      const phone = doc.data();
      return {
        id: id,
        title: phone.title,
        description: phone.description,
        descriptionEN: phone.descriptionEN,
        price: phone.price,
        type: phone.type,
        url: phone.url
      };
    });
    return phones;
  };
  
  export const getAndroidPhones = async () => {
    const phonesCollection = collection(db, PHONES_TABLE);
    const snapshot = await getDocs(phonesCollection);

    const androidPhones = snapshot.docs
      .filter((doc) => doc.data().type === 1)
      .map((doc) => {
        const id = doc.id;
        const phone = doc.data();
        return {
          id: id,
          title: phone.title,
          description: phone.description,
          price: phone.price,
          type: phone.type,
          url: phone.url,
        };
      });
    return androidPhones;
};

export const getIPhones = async () => {
  const phonesCollection = collection(db, PHONES_TABLE);
  const snapshot = await getDocs(phonesCollection);

  const iPhones = snapshot.docs
    .filter((doc) => doc.data().type === 2)
    .map((doc) => {
      const id = doc.id;
      const phone = doc.data();
      return {
        id: id,
        title: phone.title,
        description: phone.description,
        price: phone.price,
        type: phone.type,
        url: phone.url,
      };
    });
  return iPhones;
};

const BANNERS_TABLE = "banners";

export const getBanners = async () => {
  const bannersCollection = collection(db, BANNERS_TABLE );
  const snapshot = await getDocs(bannersCollection);

  const banners = snapshot.docs.map((doc) => {
    const id = doc.id;
    const banner = doc.data();
    return {
      id: id,
      image: banner.image,
      url: banner.url
    };
  });
  return banners;
};
  