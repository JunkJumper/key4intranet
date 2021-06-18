<template>
    <span>
        {{message}}
    </span>
</template>
<script>
import echoService from '../services/echo.service'

export default {
    name : 'echo',
    data : function(){
        return {
            message : 'mglfkdjhgmsfkld tmgl h'
        }
    },
    created : function(){
        this.GetEcho();
    },
    methods : {
        GetEcho : function(){
            echoService.getAutorizedEcho().then(
                resp => {
                    var response = resp.status ? resp : resp.response; 
                    if(response.status == 200){
                        this.message = response.data;
                    }
                }
            )
        }
    }
}
</script>
