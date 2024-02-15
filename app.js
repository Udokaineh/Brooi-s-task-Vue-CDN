const app = Vue.createApp({
    data() {
        return {
            title: "Welcome to your TO-DO App!",
            formHidden: true,
            dummyDisplay: true,
            dateValue: '', // Separate data properties for each input
            titleValue: '',
            paraValue: '',
            rightScroll: false,
            userArray: [],
            recentlyAddedItem: null,
            selectedItem: null,
            statusText: 'Task status',
            searchQuery: '',
        }
    },

    methods: {
        createButtonClicked() {
            this.formHidden = false;
            this.dummyDisplay = false;
            this.$nextTick(() => {
                this.$refs.dateInput.focus();
            });
            this.hideRightScroll();
        },
        close() {
            this.formHidden = true;
            this.dummyDisplay = true;
            this.hideRightScroll();
        },

        collectData(e) {
            e.preventDefault();

            const newItem = {
                date: this.dateValue || "Date?",
                title: this.titleValue,
                para: this.paraValue,
            };

            this.recentlyAddedItem = newItem;

            this.userArray.unshift(newItem);
            localStorage.setItem("userData", JSON.stringify(this.userArray));

            this.dateValue = '';
            this.titleValue = '';
            this.paraValue = '';
            this.revealRightScroll();
            this.hideForm(this.$refs.form);
            this.revealRightScroll();
        },

        hideRightScroll() {
            this.rightScroll = false;
        },
        hideForm(form) {
            form.reset();
            this.formHidden = true;
        },

        revealRightScroll() {
            this.rightScroll = true;
        },

        selectItem(items) {
            this.recentlyAddedItem = items
            this.selectedItem = items
            this.revealRightScroll()
            this.dummyDisplay = false
        },

        deleteItem(index) {
            this.userArray.splice(index, 1)
            localStorage.setItem("userData", JSON.stringify(this.userArray))
        },
        editText(item, index) {
            this.editedItem = item;
            this.hideRightScroll()
            this.formHidden = false
            // Update form fields (using data binding)
            this.titleValue = item.title
            this.paraValue = item.para
            this.deleteItem(index)
        },

        adjustTextareaHeight(event) {
            const textarea = event.target;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        },

        searchItems() {
            return this.userArray.filter(item => {
              // Filter based on title and para, you can extend this logic as needed
              return item.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                     item.para.toLowerCase().includes(this.searchQuery.toLowerCase());
            });
          },       
        
    },

    computed: {
        displayedItem() {
            return this.selectedItem || this.recentlyAddedItem;
        },
        filteredItems() {
            // Return filtered items based on search query
            return this.searchQuery ? this.searchItems() : this.userArray;
        }
    },

    mounted() {
        if (localStorage.getItem("userData")) {
            this.userArray = JSON.parse(localStorage.getItem("userData"));
        }
    }
});

app.mount("#app");
