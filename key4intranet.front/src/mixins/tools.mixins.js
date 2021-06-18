export default {
    methods: {
        showToast: function(title, body, variant = 'default') {
            console.log('show toast : ' + body);
            this.$bvToast.toast(body, {
                title: title,
                autoHideDelay: 5000,
                variant: variant,
                appendToast: false
            });
        }
    }
}