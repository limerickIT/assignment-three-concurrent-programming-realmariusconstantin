# Shopping Cart Implementation Guide

## Summary
A fully functional shopping cart feature has been implemented for the Zelora e-commerce platform, with both backend and frontend components. The cart is persistent and saves all items to the database.

## Files Created/Modified

### Backend (Spring Boot Java)

#### 1. **CartItem Entity** - `src/main/java/com/example/assignment_three_zelora/model/entitys/CartItem.java`
- JPA entity representing a shopping cart item
- Fields: cartItemId, userId, product, quantity, price
- Includes `getSubtotal()` method to calculate item total
- Uses `@ManyToOne` relationship with Product entity

#### 2. **CartItemRepository** - `src/main/java/com/example/assignment_three_zelora/repository/CartItemRepository.java`
- Extends JpaRepository for database operations
- Custom queries:
  - `findByUserId()` - Get all items for a user
  - `findByUserIdAndProductProductId()` - Check if product already in cart
  - `deleteByUserIdAndCartItemId()` - Remove item from cart

#### 3. **CartItemService** - `src/main/java/com/example/assignment_three_zelora/service/CartItemService.java`
- Business logic for cart operations
- Methods:
  - `getCartByUserId(userId)` - Retrieve user's cart
  - `addToCart(userId, productId, quantity)` - Add product or update quantity
  - `updateQuantity(cartItemId, newQuantity)` - Update item quantity
  - `removeFromCart(userId, cartItemId)` - Remove item
  - `getCartTotal(userId)` - Calculate cart total
  - `clearCart(userId)` - Empty entire cart

#### 4. **CartItemController** - `src/main/java/com/example/assignment_three_zelora/controller/CartItemController.java`
- REST API endpoints:
  - `GET /api/cart/{userId}` - Get all cart items
  - `POST /api/cart/add` - Add item to cart
  - `PUT /api/cart/update` - Update quantity
  - `DELETE /api/cart/remove/{cartItemId}` - Remove item
  - `GET /api/cart/total/{userId}` - Get cart total
  - `DELETE /api/cart/clear/{userId}` - Clear cart

#### 5. **Database SQL** - `src/main/resources/static/assets/sql/add_cart_items_table.sql`
```sql
CREATE TABLE `cart_items` (
  `cart_item_id` int AUTO_INCREMENT PRIMARY KEY,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int DEFAULT 1,
  `price` decimal(10,2) NOT NULL,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`),
  FOREIGN KEY (`user_id`) REFERENCES `customers`(`customer_id`),
  UNIQUE KEY `unique_user_product` (`user_id`, `product_id`)
)
```

### Frontend (React)

#### 1. **CartContext** - `src/context/CartContext.js`
- React Context API for global cart state management
- Provider wraps entire app
- State:
  - `cartItems` - Array of cart items
  - `loading` - Loading state
  - `error` - Error messages
  - `userId` - Currently 1 (hardcoded for demo)
- Functions:
  - `addToCart(productId, quantity)` - Add item
  - `removeFromCart(cartItemId)` - Remove item
  - `updateQuantity(cartItemId, newQuantity)` - Update quantity
  - `getCartTotal()` - Calculate total
  - `clearCart()` - Empty cart
  - `loadCart()` - Sync with backend

#### 2. **useCart Hook** - `src/hooks/useCart.js`
- Custom hook to access CartContext
- Usage: `const { cartItems, addToCart, ... } = useCart();`

#### 3. **Cart Page** - `src/pages/Cart.jsx`
- Full shopping cart interface
- Features:
  - Product listing in table format
  - Product name, price, quantity, subtotal
  - Quantity selector with ± buttons
  - Remove button for each item
  - Order summary sidebar
  - Total price calculation
  - Empty cart message
  - Continue shopping link
  - Responsive design

#### 4. **Cart Styles** - `src/pages/Cart.css`
- Table layout with responsive grid
- Sticky order summary sidebar
- Quantity selector styling
- Mobile-responsive design

### Updated Files

#### 1. **App.js**
- Added `CartProvider` wrapper around routes
- Wraps entire application to provide cart context

#### 2. **ProductDetails.jsx**
- Added "Add to Cart" button with functionality
- Imports and uses `useCart` hook
- `handleAddToCart` function with error handling
- Button shows loading state while adding

## How to Use

### 1. Database Setup
Run the SQL script to create the cart_items table:
```bash
# In your MySQL client or tool, run:
source add_cart_items_table.sql
```

Or execute the CREATE TABLE statement directly in MySQL.

### 2. Backend Setup
No additional configuration needed - Spring Boot will automatically:
- Scan the new CartItem entity
- Create repository beans
- Create service and controller beans

### 3. Frontend Usage

**Add to Cart:**
```javascript
const { addToCart } = useCart();
await addToCart(productId, quantity);
```

**View Cart Page:**
Navigate to `/cart` route to see cart items

**Access Cart Context:**
```javascript
import { useCart } from '../hooks/useCart';

const MyComponent = () => {
  const { cartItems, getCartTotal } = useCart();
  // Use cart data
};
```

## Key Features

✅ **Persistent Cart** - Saved to database
✅ **Real-time Sync** - Backend synchronized
✅ **Quantity Management** - Update quantities easily
✅ **Total Calculation** - Automatic subtotal & total
✅ **Item Removal** - Remove individual items
✅ **Cart Clearing** - Empty entire cart
✅ **Error Handling** - Graceful error messages
✅ **Loading States** - User feedback during operations
✅ **Responsive Design** - Works on mobile/tablet/desktop
✅ **Global State** - Cart available anywhere in app

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/cart/{userId}` | Get all cart items |
| POST | `/api/cart/add` | Add item to cart |
| PUT | `/api/cart/update` | Update item quantity |
| DELETE | `/api/cart/remove/{cartItemId}` | Remove item from cart |
| GET | `/api/cart/total/{userId}` | Get cart total |
| DELETE | `/api/cart/clear/{userId}` | Clear entire cart |

## Request/Response Examples

### Add to Cart
**Request:**
```json
POST /api/cart/add
{
  "userId": 1,
  "productId": 5,
  "quantity": 2
}
```

**Response:**
```json
{
  "cartItemId": 1,
  "userId": 1,
  "product": { /* Product object */ },
  "quantity": 2,
  "price": "49.99"
}
```

### Get Cart
**Request:**
```json
GET /api/cart/1
```

**Response:**
```json
[
  {
    "cartItemId": 1,
    "userId": 1,
    "product": { /* Product */ },
    "quantity": 2,
    "price": "49.99"
  },
  { /* More items */ }
]
```

## Notes

- User ID is currently hardcoded to 1 (for demo purposes)
- In production, would integrate with authentication system to get actual user ID
- Prices are stored at time of adding to cart (not pulled from product every time)
- Unique constraint on (userId, productId) prevents duplicate items (quantity is updated instead)
- Cart loads from backend on app mount and stays in sync

## Testing

1. Add product to cart from product details page
2. Navigate to `/cart` to view cart
3. Update quantities using ± buttons
4. Remove items if needed
5. Verify total calculation
6. Refresh page - cart should persist
7. Test error scenarios (network issues, etc.)

## Future Enhancements

- User authentication integration
- Save cart to local storage as backup
- Wishlist integration
- Coupon/discount codes
- Shipping cost calculation
- Tax calculation
- Checkout integration
- Order history
