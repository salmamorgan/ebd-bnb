import express from "express";
const app = express();
// Our fake database for now
const listings = [
    { id: 1, title: "Nile View Apartment", pricePerNight: 85 },
    { id: 2, title: "Beach House", pricePerNight: 140 },
    { id: 3, title: "Desert Eco-Lodge", pricePerNight: 60 },
];
app.get("/", (req, res) => {
    res.send("Welcome to ebd bn'b");
});
app.get("/api/listings", (req, res) => {
    res.json(listings);
});
app.get("/api/listings/:id", (req, res) => {
    const id = Number(req.params.id);
    const listing = listings.find((listing) => listing.id === id);
    if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
    }
    res.json(listing);
});
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

// model 

function getAllListings() {
    return listings;
}
function getListingById(id) {
    return listings.find((listing) => listing.id === id);
}
function addListing(data) {
    const listing = {
        id: nextId++,
        title: data.title,
        pricePerNight: data.pricePerNight,
    };
    listings.push(listing);
    return listing;
}
function updateListing(id, data) {
    const listing = getListingById(id);
    if (listing) {
        listing.title = data.title;
        listing.pricePerNight = data.pricePerNight;
    }
    return listing;
}
function removeListing(id) {
    const listing = getListingById(id);
    listings = listings.filter((item) => item.id !== id);
    return listing;
}

// controllers

function handleGetAll(req, res) {
    res.json(getAllListings());
}
function handleGetOne(req, res) {
    const listing = getListingById(Number(req.params.id));
    if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
    }
    res.json(listing);
}

//routes

app.get("/", (req, res) => {
res.send("Welcome to ebd bn'b");
});
app.get("/api/listings", handleGetAll);
app.get("/api/listings/:id", handleGetOne);
app.post("/api/listings", handleCreate);
app.put("/api/listings/:id", handleUpdate);
app.delete("/api/listings/:id", handleDelete);