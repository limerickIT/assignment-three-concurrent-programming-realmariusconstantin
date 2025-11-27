[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/xtCNXZhd)


# **Zelora – E-Commerce Platform**

Zelora is a full-stack e-commerce application built with **React (frontend)** and  **Spring Boot (backend)** .

It includes product browsing, search, categories, comparison, cart, checkout, orders, and an admin dashboard.

---

## **How to Run the Project**

### **Start the Frontend (React)**

<pre class="overflow-visible!" data-start="469" data-end="514"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>cd</span><span> frontend
npm install
npm start
</span></span></code></div></div></pre>

Runs on:

**[http://localhost:3000](http://localhost:3000)**

---

### **Start the Backend (Spring Boot)**

<pre class="overflow-visible!" data-start="604" data-end="649"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>cd</span><span> backend
./mvnw spring-boot:run
</span></span></code></div></div></pre>

(Windows)

<pre class="overflow-visible!" data-start="662" data-end="694"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>mvnw spring-boot:run
</span></span></code></div></div></pre>

Runs on:

**[http://localhost:8080]()**

---

## **Database**

Create a MySQL database:

<pre class="overflow-visible!" data-start="785" data-end="819"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-sql"><span><span>CREATE</span><span> DATABASE zelora;
</span></span></code></div></div></pre>

Update your DB username/password in

<pre class="overflow-visible!" data-start="859" data-end="916"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>backend/</span><span>src</span><span>/</span><span>main</span><span>/resources/application</span><span>.properties</span><span>
</span></span></code></div></div></pre>

---

## **Main Features**

* Product browsing & search
* Category filtering
* Shopping cart
* Checkout & orders
* Product comparison drawer
* Login & registration (JWT)
* Admin: manage products, categories, customers, orders
* Image upload for products

# **Zelora – E-Commerce Platform**

Zelora is a full-stack e-commerce application built with **React (frontend)** and  **Spring Boot (backend)** .

It includes product browsing, search, categories, comparison, cart, checkout, orders, and an admin dashboard.

---

## **How to Run the Project**

### **Start the Frontend (React)**

<pre class="overflow-visible!" data-start="469" data-end="514"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>cd</span><span> frontend
npm install
npm start
</span></span></code></div></div></pre>

Runs on:

**[http://localhost:3000](http://localhost:3000)**

---

### **Start the Backend (Spring Boot)**

<pre class="overflow-visible!" data-start="604" data-end="649"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>cd</span><span> backend
./mvnw spring-boot:run
</span></span></code></div></div></pre>

(Windows)

<pre class="overflow-visible!" data-start="662" data-end="694"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>mvnw spring-boot:run
</span></span></code></div></div></pre>

Runs on:

**[http://localhost:8080]()**

---

## **Database**

Create a MySQL database:

<pre class="overflow-visible!" data-start="785" data-end="819"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-sql"><span><span>CREATE</span><span> DATABASE zelora;
</span></span></code></div></div></pre>

Update your DB username/password in

<pre class="overflow-visible!" data-start="859" data-end="916"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>backend/</span><span>src</span><span>/</span><span>main</span><span>/resources/application</span><span>.properties</span><span>
</span></span></code></div></div></pre>

---

## **Main Features**

* Product browsing & search
* Category filtering
* Shopping cart
* Checkout & orders
* Product comparison drawer
* Login & registration (JWT)
* Admin: manage products, categories, customers, orders
* Image upload for products
