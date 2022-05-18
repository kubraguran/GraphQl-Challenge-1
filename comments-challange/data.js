const users = [
    {
        id:'1',
        fullName:'Kubra Guran',
        age:27,
    },
    {
        id:'2',
        fullName:'Halit Ziya',
        age:50,
    },
];

const posts = [
    {
        id:'1',
        title:"Kubra'nin gonderisi",
        user_id:'1'

    },
    {
        id:'2',
        title:"Kubra'nin gonderisi",
        user_id:'1'
    },
    {
        id:'3',
        title:"Halit Ziya'nin'nin gonderisi",
        user_id:'2'
    },
];

const comments = [
  {
      id:'1',
      text:'Lorem Ipsum',
      post_id:'1',
      user_id: "2",
    },
    {
        id:'2',
        text:'Lorem Ipsum doler',
        post_id:'1',
        user_id: "2",
      },
      {
        id:'3',
        text:'foo bar',
        post_id:'2',
        user_id: "1",
      },
      {
        id:'4',
        text:'foo bar daz',
        post_id:'3',
        user_id: "1 ",
      },
]

module.exports = {
    users,
    posts,
    comments,
}