import Event from '../../../util/Event.js';
import appDispatcher from '../../dispatcher/dispatcher.js';
import LI from '../../../plugin/li/li-1.0.0.js';

const ShopStore = {
	_state: {
        width: LI.screenWidth(),
        nickName: '17603001616'
	},
	getAll(){
        return this._state;
    },
    updateAll(source){
        Object.assign(this._state,source);
    },
    clearAll(){
        this._state = {};
    }
};
Event.mixin(ShopStore);

appDispatcher.register(function(payload){
	switch(payload.actionName){
		case 'banner-list-v2': 
            LI.ajax({
                url: "/api/app/banner-list",
                success: function(data) {
                    if(typeof data == 'string'){
                        data = JSON.parse(data)
                    }
                    
                    ShopStore.updateAll({
                        bannerList: data.detail
                    });
                    ShopStore.trigger("change");
                } 
            })
            break;
        case 'product-list-v2': 
            LI.ajax({
                url: "/api/insurance/get-insurance-list",
                success: function(data) {
                    if(typeof data == 'string'){
                        data = JSON.parse(data)
                    }
                    
                    ShopStore.updateAll({
                        productList: data.detail
                    });
                    ShopStore.trigger("change");
                } 
            })
            break;    
            
	}
})
export default ShopStore;