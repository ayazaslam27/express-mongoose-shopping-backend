var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var products = require("../models/products");

router.get("/getProducts/", function(req, res, next) {
  const pageNo = req.query.pageNo;
  const limit = req.query.limit;
  delete req.query.pageNo;
  delete req.query.limit;

  let query = { ...req.query };
  products
    .find(query)
    .skip((parseInt(pageNo) - 1) * parseInt(limit))
    .limit(parseInt(limit))
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get("/getTopProducts", function(req, res, next) {
  products
    .find({ rating: { $gt: 4.5 } })
    .limit(10)
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get("/getProduct", function(req, res, next) {
  let query = { ...req.query };
  products
    .findOne(query)
    .limit(10)
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get("/getTotalProducts", function(req, res, next) {
  let query = { ...req.query };
  products
    .find(query)
    .exec()
    .then(docs => {
      res.status(200).json(docs.length);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/postProducts", function(req, res, next) {
  products
    .insertMany([
      new products({
        _id: new mongoose.Types.ObjectId(),
        brand: "Lenovo",
        category: "Laptops",
        articleNumber: 2,
        rating: 5,
        title:
          'Lenovo V145-15 81MT000XGE 15" FHD, AMD A4-9125, 4GB RAM, 256GB SSD, Windows 10 _4',
        thumbnail:
          "//media.nbb-cdn.de/images/products/310000/316053/small_slider_nbb_MacbookAir_front.jpg",
        description:
          ' AMD® A-Serie APU A4-9125 2x 2,30 GHz (TurboBoost bis zu 2.60 GHz) / 4 GB RAM / 256 GB SSD Festplatte / DVD-Laufwerk / Radeon R3 / 38 cm (15") 1920 x 1080 Pixel (Full HD) entspiegeltes Display / WLAN 802.11 ac / Bluetooth 4.1 / integr. Webkamera / bis zu 5 Std. Akkulaufzeit / 2.1 kg / Windows 10 Home 64 Bit',
        price: 500,
        oldPrice: 700,
        imgSource:
          "//media.nbb-cdn.de/images/products/410000/419143/small_Lenovo_V145_15_Zoll_01.jpg?size=195",
        technical_details: {
          Herstellernummer: "5JDRC",
          EANNumber: "5397184082577",
          Processor: {
            TurboBoost: "3.10 GHz",
            Cache: "3 MB",
            Type: "Intel® Core™ i5 (7. Generation) 7200U Prozessor 2x 2,5 GHz"
          },
          Display: {
            Size: '39 cm (15,6")',
            Resolution: "1920 x 1080 Pixel (Full HD)",
            Art: "mattes Display",
            LED: true,
            HDTV: "FULL HD (1080p)"
          },
          Ram: {
            Size: "16GB",
            Technology: "DDR4"
          },
          HardDisk: {
            Size: "1TB",
            Typ: "SSD",
            Format: "M2"
          }
        },
        imageUrls: [
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/410000/419143/Lenovo_V145_15_Zoll_01.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/410000/419143/Lenovo_V145_15_Zoll_02.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/410000/419143/Lenovo_V145_15_Zoll_03.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/410000/419143/Lenovo_V145_15_Zoll_04.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/410000/419143/Lenovo_V145_15_Zoll_05.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/410000/419143/Lenovo_V145_15_Zoll_06.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/410000/419143/Lenovo_V145_15_Zoll_07.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/410000/419143/Lenovo_V145_15_Zoll_08.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/410000/419143/Lenovo_V145_15_Zoll_00.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/410000/419143/Lenovo_V145_15_Zoll_10.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/410000/419143/Lenovo_V145_15_Zoll_11.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/410000/419143/Lenovo_V145_15_Zoll_12.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/410000/419143/Lenovo_V145_15_Zoll_13.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/410000/419143/Lenovo_V145_15_Zoll_14.jpg?size=2800"
          }
        ]
      }),
      new products({
        _id: new mongoose.Types.ObjectId(),
        brand: "Apple",
        category: "Laptops",
        articleNumber: 7,
        rating: 5,
        title:
          'Apple MacBook Pro 15" - Space Grau 2018 MR932D/A i7 2.2GHz, 16GB RAM, 256GB SSD, Radeon Pro 555X - Touch Bar 4',
        thumbnail:
          "https://media.nbb-cdn.de/images/misc/apple_macbookpro_15_space_mitTB_01_klein.jpg",
        description:
          'Intel® Core™ i7(8. Generation) 6x 2, 20 GHz(TurboBoost bis zu 4.10 GHz) / 16 GB RAM / 256 GB SSD Festplatte / Radeon Pro 555X GDDR5 / 39 cm(15, 4") 2880 x 1800 Pixel (Retina) glänzendes Display / WLAN 802.11 ac / Bluetooth 5.0 / HD 720p Webcam / bis zu 10 Std. Akkulaufzeit / 1.83 kg / macOS',
        price: 1000,
        oldPrice: 1100,
        imgSource:
          "https://media.nbb-cdn.de/images/misc/apple_macbookpro_15_space_mitTB_01_klein.jpg",
        technical_details: {
          Herstellernummer: "5JDRC",
          EANNumber: "5397184082577",
          Processor: {
            TurboBoost: "3.10 GHz",
            Cache: "3 MB",
            Type: "Intel® Core™ i5 (7. Generation) 7200U Prozessor 2x 2,5 GHz"
          },
          Display: {
            Size: '39 cm (15,6")',
            Resolution: "1920 x 1080 Pixel (Full HD)",
            Art: "mattes Display",
            LED: true,
            HDTV: "FULL HD (1080p)"
          },
          Ram: {
            Size: "16GB",
            Technology: "DDR4"
          },
          HardDisk: {
            Size: "1TB",
            Typ: "SSD",
            Format: "M2"
          }
        },
        imageUrls: [
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/370000/378302/apple_macbookpro_15_space_mitTB_01.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/370000/378302/apple_macbookpro_15_space_mitTB_02.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/370000/378302/apple_macbookpro_15_space_mitTB_03.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/370000/378302/apple_macbookpro_15_space_mitTB_04.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/370000/378302/apple_macbookpro_15_space_mitTB_05.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/370000/378302/apple_macbookpro_15_space_mitTB_06.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/370000/378302/apple_macbookpro_15_space_mitTB_07.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/370000/378302/apple_macbookpro_15_space_mitTB_08.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/370000/378302/apple_macbookpro_15_space_mitTB_09.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/370000/378302/apple_macbookpro_15_space_mitTB_10.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/370000/378302/apple_macbookpro_15_space_mitTB_03.jpg?size=50"
          }
        ]
      }),
      new products({
        _id: new mongoose.Types.ObjectId(),
        brand: "Hp",
        category: "Laptops",
        articleNumber: 8,
        rating: 5,
        title:
          'HP EliteBook x360 1030 G3 4QY24EA 13,3" Full HD Touch, Intel Core i5-8250U, 16GB RAM, 512GB SSD, Win10 Pro 4',
        thumbnail:
          "//media.nbb-cdn.de/images/products/380000/381459/small_HP_EliteBook_1030_G3_13.3_001.jpg?size=195",
        description:
          'Intel® Core™ i5(8. Generation) 8250U 4x 1, 60 GHz(TurboBoost bis zu 3.40 GHz) / 16 GB RAM / 512 GB SSD Festplatte / UHD Graphics 620 / 33 cm(13, 3") 1920 x 1080 Pixel (Full HD) Touchscreen / Intel® Dual Band Wireless-AC 8265 (2x2) / Bluetooth 4.2 / Full-HD-Webcam / bis zu 18 Std. Akkulaufzeit / 1.25 kg / Windows 10 Pro 64 Bit',
        price: 2000,
        oldPrice: 2178,
        imgSource:
          "//media.nbb-cdn.de/images/products/380000/381459/small_HP_EliteBook_1030_G3_13.3_001.jpg?size=195",
        technical_details: {
          Herstellernummer: "5JDRC",
          EANNumber: "5397184082577",
          Processor: {
            TurboBoost: "3.10 GHz",
            Cache: "3 MB",
            Type: "Intel® Core™ i5 (7. Generation) 7200U Prozessor 2x 2,5 GHz"
          },
          Display: {
            Size: '39 cm (15,6")',
            Resolution: "1920 x 1080 Pixel (Full HD)",
            Art: "mattes Display",
            LED: true,
            HDTV: "FULL HD (1080p)"
          },
          Ram: {
            Size: "16GB",
            Technology: "DDR4"
          },
          HardDisk: {
            Size: "1TB",
            Typ: "SSD",
            Format: "M2"
          }
        },
        imageUrls: [
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/380000/381459/HP_EliteBook_1030_G3_13.3_001.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/380000/381459/HP_EliteBook_1030_G3_13.3_002.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/380000/381459/HP_EliteBook_1030_G3_13.3_003.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/380000/381459/HP_EliteBook_1030_G3_13.3_004.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/380000/381459/HP_EliteBook_1030_G3_13.3_005.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/380000/381459/HP_EliteBook_1030_G3_13.3_006.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/380000/381459/HP_EliteBook_1030_G3_13.3_007.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/380000/381459/HP_EliteBook_1030_G3_13.3_008.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/380000/381459/HP_EliteBook_1030_G3_13.3_009.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/380000/381459/HP_EliteBook_1030_G3_13.3_005.jpg?size=2800"
          }
        ]
      }),
      new products({
        _id: new mongoose.Types.ObjectId(),
        brand: "Dell",
        category: "Laptops",
        articleNumber: 4,
        rating: 5,
        title:
          'Dell Latitude 5590 Business / 15,6" FHD matt / Intel Core i7-8650U / 16GB DDR4 / 512GB SSD / Windows 10 Pro 4',
        description:
          'Intel® Core™ i7(8. Generation) 8650U 4x 1.90 GHz(TurboBoost bis zu 4.20 GHz) / 16 GB RAM / 512 GB SSD Festplatte / UHD Graphics 620 / 39 cm(15, 6") 1920 x 1080 Pixel (Full HD) mattes Display / Wireless LAN 802.11 a/b/g/n/ac / Bluetooth 4.1 / integr. Webkamera / bis zu 10 Std. Akkulaufzeit / 1.93 kg / Windows 10 Pro 64 Bit',
        price: 1000,
        oldPrice: 1293,
        thumbnail:
          "//media.nbb-cdn.de/images/products/420000/420170/small_dell_latitude5580_front.jpg?size=195",
        imgSource:
          "//media.nbb-cdn.de/images/products/420000/420170/small_dell_latitude5580_front.jpg?size=195",
        technical_details: {
          Herstellernummer: "5JDRC",
          EANNumber: "5397184082577",
          Processor: {
            TurboBoost: "3.10 GHz",
            Cache: "3 MB",
            Type: "Intel® Core™ i5 (7. Generation) 7200U Prozessor 2x 2,5 GHz"
          },
          Display: {
            Size: '39 cm (15,6")',
            Resolution: "1920 x 1080 Pixel (Full HD)",
            Art: "mattes Display",
            LED: true,
            HDTV: "FULL HD (1080p)"
          },
          Ram: {
            Size: "16GB",
            Technology: "DDR4"
          },
          HardDisk: {
            Size: "1TB",
            Typ: "SSD",
            Format: "M2"
          }
        },
        imageUrls: [
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/420000/420170/dell_latitude5580_front.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/420000/420170/dell_latitude5580_frontside.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/420000/420170/dell_latitude5580_frontside2.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/420000/420170/dell_latitude5580_backside.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/420000/420170/dell_latitude5580_backside2.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/420000/420170/dell_latitude5580_backside2.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/420000/420170/dell_latitude5580_back.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/420000/420170/dell_latitude5580_side.jpg?size=2800"
          },
          {
            imageUrl:
              "https://media.nbb-cdn.de/images/products/420000/420170/dell_latitude5580_side2.jpg?size=2800"
          }
        ]
      })
    ])
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
