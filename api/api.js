const express = require('express');
const auth = require('../middlewares/auth.js');
const router = express.Router();

const { organizationLogin, createOrganization, getOrganization, updateOrganization } = require('../controllers/OrganizationController.js');
const { addBrand, getBrands, updateBrand } = require('../controllers/BrandController.js');
const { addProduct, getProductsByBrand, updateProductById, getProducts } = require('../controllers/ProductController.js');
const { addSalesman, getSalesmans, updateSalesman } = require('../controllers/SalesmanController.js');
const { addShop, getShops, updateShop } = require('../controllers/ShopController.js');
const { addSuperstocker, getSuperstockers, updateSuperstocker } = require('../controllers/SuperStockerController.js');
const { addPurchase, getPurchases, updatePurchase } = require('../controllers/PurchaseController.js');
const { addSale, getSales, updateSale } = require('../controllers/SaleController.js');

router.route('health-check',(req,res)=>{res.send("Server is up")})

router.route('/organization/login')
    .post(organizationLogin);
router.route('/organization/signup')
    .post(createOrganization);
router.route('/organization/')
    .get(auth,getOrganization)
    .put(auth,updateOrganization);

router.route('/brand/:id')
    .put(auth,updateBrand);
router.route('/brand/')
    .get(auth,getBrands)
    .post(auth,addBrand);

router.route('/getProductsByBrand/:brand')
    .get(auth,getProductsByBrand);
router.route('/product/:id')
    .put(auth,updateProductById);
router.route('/product/')
    .post(auth,addProduct);
router.route('/getProducts/')
    .post(auth,getProducts)

router.route('/updateSalesman/:id')
    .put(auth,updateSalesman);
router.route('/salesman')
    .get(auth,getSalesmans)
    .post(auth,addSalesman);

router.route('/updateShop/:id')
    .put(auth,updateShop);
router.route('/shop')
    .get(auth,getShops)
    .post(auth,addShop);

router.route('/updateSuperstocker/:id')
    .put(auth,updateSuperstocker);
router.route('/superstocker')
    .get(auth,getSuperstockers)
    .post(auth,addSuperstocker);

router.route('/updatePurchase/:id')
    .put(auth,updatePurchase);
router.route('/purchase')
    .post(auth,addPurchase);
router.route('/getPurchases')
    .post(auth,getPurchases)

router.route('/updateSale/:id')
    .put(auth,updateSale);
router.route('/sale')
    .post(auth,addSale);
router.route('/getSales')
    .post(auth,getSales)

module.exports = router;