export const singleChapterData = [

    {
        "name": "Image 9",
        "_id": "64f0b2f5c1a3b4d5e6f7a8b9",
        "isFavourite": false,
        "isCompleted": true,
        "url": "/single-chapter/image-9.jpg",
        "chapterId": "chapter_id_1",
        "ocr": "<h1 class='text-pink-500 font-bold text-3xl pb-2'>Parameters or Arguments</h1><p class='text-blue-900 pb-3 leading-relaxed'>The Date props are also similar.</p><p class='text-blue-900 pb-3 leading-relaxed'>If we are displaying, say looping through an array of elements data, we must uniquely identify it by mapping a Key attribute of each of the looped array.</p><p class='text-blue-900 pb-3 leading-relaxed'>When a new component is added, React must have knowledge it is new and of what DOM thing has to re-render it. Because all the components will be at the same Level, so we must apply a Key attribute to allow React to track what is new and what is required to be re-rendered.</p><h1 class='text-pink-500 font-bold text-3xl pb-2'>File Structure in React</h1>",
        "enhancedText": "<h1 class='text-pink-500 font-bold text-3xl pb-2'>Parameters and Arguments in React</h1><p class='text-blue-900 pb-3 leading-relaxed'>In React, parameters and arguments are fundamental to passing data between components and functions. They are how you send information into a reusable piece of code, allowing it to perform specific tasks with varying inputs.</p><div class='text-blue-900 italic pb-4'>Example: Consider a function that formats a date. The date itself is the argument passed to the function, and inside the function, it's treated as a parameter.</div><h2 class='text-pink-500 font-bold text-2xl pt-4 pb-1'>Props as Arguments</h2><p class='text-blue-900 pb-3 leading-relaxed'>Props in React components function similarly to arguments. When you pass data from a parent component to a child component using props, you're essentially providing arguments to the child component. The child component then uses these props to render its output.</p><div class='text-blue-900 italic pb-4'>Example: Imagine a 'Profile' component receiving a 'name' prop. The 'name' prop acts as an argument, allowing the 'Profile' component to display the user's name.</div><h2 class='text-pink-500 font-bold text-2xl pt-4 pb-1'>The Importance of Keys in React Lists</h2><p class='text-blue-900 pb-3 leading-relaxed'>When rendering lists of components in React, each item needs a unique 'key' prop.  This key helps React efficiently update the DOM when items are added, removed, or reordered.</p><p class='text-blue-900 pb-3 leading-relaxed'>Without keys, React might re-render the entire list instead of just the changed items, leading to performance issues.</p><div class='text-blue-900 italic pb-4'>Example: If you have a list of to-do items, each item should have a unique ID as its key. This allows React to quickly identify which to-do item has been completed and needs to be updated without affecting the other items.</div><p class='text-blue-900 pb-3 leading-relaxed'>Think of it like assigning a unique ID number to each student in a class. The teacher (React) can quickly identify and track each student (component) without getting them confused.</p><h2 class='text-pink-500 font-bold text-2xl pt-4 pb-1'>File Structure in React Projects</h2><p class='text-blue-900 pb-3 leading-relaxed'>A well-organized file structure is crucial for maintaining a React project, especially as it grows in complexity. A common pattern is to group components, styles, and assets into logical folders.</p><div class='text-blue-900 italic pb-4'>Example: You might have a 'components' folder containing individual component files, a 'styles' folder for CSS or styling libraries, and an 'assets' folder for images and other static resources.</div><p class='text-blue-900 pb-3 leading-relaxed'>This approach promotes code reusability, makes it easier to locate specific files, and improves overall project maintainability. Consistent file structure greatly enhances collaboration among developers on a project.</p>",
        "videos": [
            {
                "title": "Communication process",
                "url": "https://youtu.be/HTF0cbWIr68",
                "thumbnail": "https://i.ytimg.com/vi/HTF0cbWIr68/default.jpg"
            },
            {
                "title": "Mastering Angular Component Communication!",
                "url": "https://youtu.be/MtTAfjiZxtk",
                "thumbnail": "https://i.ytimg.com/vi/MtTAfjiZxtk/default.jpg"
            },
            {
                "title": "Angular component communication",
                "url": "https://youtu.be/-zJVea9DPb8",
                "thumbnail": "https://i.ytimg.com/vi/-zJVea9DPb8/default.jpg"
            },
            {
                "title": "Elements of communication Process of communication Sender message channel encoding decoding feedback",
                "url": "https://youtu.be/0PnpiZeiMlI",
                "thumbnail": "https://i.ytimg.com/vi/0PnpiZeiMlI/default.jpg"
            },
            {
                "title": "Component of Communication Bs English Class Second Semester",
                "url": "https://youtu.be/YzvCxRSxRfE",
                "thumbnail": "https://i.ytimg.com/vi/YzvCxRSxRfE/default.jpg"
            }
        ]
    },
]