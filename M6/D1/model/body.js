import mongoose from "mongoose";

const JsonBody = mongoose.Schema({
    category: String,
    title: String,
    cover: String,
    readTime: Object,
    author: Object,
    content: String,
    createdAt: Date,
});

/** "_id": 1,
    "category": "Getting Started",
    "title": "From 'Hello World' to Getting Hired as Software Engineer: Epicode meets Mimo",
    "cover": "https://picsum.photos/800/400",
    "readTime": {
      "value": 1,
      "unit": "minute"
    },
    "author": {
      "name": "Tobia De Angelis",
      "avatar": "https://picsum.photos/800/400"
    },
    "content": "<div class='py-5 blog-content'><p>We're thrilled to announce we're teaming up with <a href='https://getmimo.com/'>Mimo</a> to launch our next Web Engineering program starting on February 1, 2021.</p><p>Mimo is the most popular code-learning app, helping millions of learners make their first steps with programming.</p><p>Since the first time we talked, we realised we have been in fact working in the very same direction: democratising access to become a software engineer.</p><p>We're now teaming up to help those in their community that have realised they truly love programming and aspire to become professionals - able to work as software engineers and transform a hobby and passion in their profession.</p><p>Democratising access to opportunity - either by making it simple to move the first steps and explore the world of programming as Mimo does, or by helping people go pro as we do at Epicode - is what makes both teams excited.</p><ul><li>Download Mimo for <a href='https://itunes.apple.com/us/app/mimo-learn-how-to-code-through/id1133960732?mt=8&amp;at=1000lpyT'>iOS</a> or <a href='https://play.google.com/store/apps/details?id=com.getmimo'>Android</a> here.</li><li><a href='https://strive.school/'>Apply here</a> to our next Web Engineering cohort.</li></ul></div>",
    "createdAt": "04 Dec 2020" */

    export const PostBody = mongoose.model("PostBody", JsonBody);