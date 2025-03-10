

## First, U need to install Docker & run redis container

- First time, open docker desktop, in terminal run:
```
docker run --name redis-server -d -p 6379:6379 redis
```

- From the second time onwards: Just open Docker Desktop and run:
```
docker start redis-server
```

## Run ticket-svc
Port: 8001
Update your .env *NEXT_TICKET_SVC_URL* = localhost:8001 to use
From now, API showing & seatmap must be call *TICKET_SVC_URL*

## Gen Data to test
Ticketbox does not provide an API to fetch all forms, so we need to handle this differently
Run prisma Studio & add some data to tables:

- Form
add 1 form

- FormInput
add 2,3 FormInput & set FormId

(or use my data (form 1))

- Showing
Choose 1 showing u want to test booking for it. Add formId u created

- ShowingTicketTypeQuantity
If ur showing is not have seatmap, just select tickettype & quantity to buy ("Chi Dep Concert")
Add data to this table

## API BOOKING STEP

### STEP 1
- From Event Detail Page. When click "Mua ve". Route to Seatmap/Booking Page
*Call Showing & Seatmap API*

### STEP 2
- After selected seat or quantity of Tickettype
*Call selectSeat to lock-seat*

Need Token Bearer, same API /user/me in NavigationBar.tsx File
If selecting seats on the seat map: Provide ShowingID and an array of SeatID.
If selecting the number of tickets by ticket type (TicketType): Provide ShowingID, TicketTypeId, and Quantity.
If not needed, these values can be left empty.

If lock-seat return success, route to Form Page
### Step 3
After submit form,
*Call API submitForm*

If success, route to payment Page

### Step 4
*Call API getPaymentMethod* to get which payments are now available and display

After user choose PAYOS

*Call API PayOSCheckout*
Cancel URL: Must be the current payment page, keeping all states intact when the user cancels the payment
Success URL: A new page where the user will be redirected after a successful payment to confirm the transaction

receive paymentUrl in response
route to that page

After user cancel payment, it will auto back to Cancel-URL
In case payment success, auto route to Success-URL with OrderCode
Example, if success-url is local:host:3000/success
PayOS will call-back to local:host:3000/success?orderCode=1000

### Step 5

In Success-URL Page,
*Call API getPayOSStatus* to check again
if receive "PAID", display success
else, I Think must route to homepage. To prevent unauthorized access to this page via direct URL entry ^^

Done!!!

### TODO 
- Set webhook later. Because webhook is just available on production, need more time to set up
- Send email after success. I just create Ticket after payment-success, need research how to gen qrCode for each ticket & send ticket via email