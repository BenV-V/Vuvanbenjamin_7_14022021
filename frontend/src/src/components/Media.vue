<template>
<div class="media">
    <div v-if="!image">
        <h2>Selectionnez une image/gif</h2>
        <input type="file" @change="onFileChange">
    </div>
    <div v-else class="preview">
        <div><img :src="image" />
        </div>
        <button id="newImage_btn" type="submit" @click="sendFile()">Publier</button>
    </div>
</div>
</template>


<script>
import axios from 'axios';

export default {
    name: 'Media',
    data(){
        return{
            image: '',
            fileName: ''
        }
    },
    methods: {
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.fileName = files[0].name
            this.createImage(files[0]);
        },
        createImage(file) {
            let reader = new FileReader();
            let _this = this;
            reader.onload = (e) => {
                _this.image = e.target.result;
            };
            reader.readAsDataURL(file);                   
        },
        sendFile() {
            const image = this.image
            axios.post(`http://localhost:5000/api/file/`,
                {
                    userId: this.$user.userId,
                    file: image, 
                    filename: this.fileName
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                })
           this.$router.go()
        }
    }

}
</script>

<style scoped>
#image{
    display: flex;
    flex-direction: column;
}
.preview{
    height: 50px;
}
button{
        margin-top: 20px;
        padding: 13px;
        font-size: 1rem;
        color: white;
        background-color: rgb(255, 0, 0);
        border: none;
        border-radius: 20px; 
}
</style>