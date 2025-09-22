// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Segment, Image, Icon } from 'semantic-ui-react';
// import 'semantic-ui-css/semantic.min.css';
// import { SelectListItem } from '../Interfaces/SelectListItem';
// import { BookModel } from '../Interfaces/BookModel';
// import { BookService } from '../Services/BookService';
// import { Dropdown } from 'semantic-ui-react';
// import { CategoryModel } from '../Interfaces/CategoryModel';
// import { PublisherModel } from '../Interfaces/PublisherModel';
// import { AuthorModel } from '../Interfaces/AuthorModel';
// export default function EditBook() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//    //text: item.name,
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//    const [authorList, setAuthorList] = useState<SelectListItem[]>([]);
//   const [categoryList, setCategoryList] = useState<SelectListItem[]>([]);
//   const [publisherList, setPublisherList] = useState<SelectListItem[]>([]);
//   const [isbnError, setIsbnError] = useState<string | null>(null);

//   // const [categoryList, setCategoryList] = useState<CategoryModel[]>([]);

//   const [values, setValues] = useState<BookModel>({
//     id: id!,
//     title: '',
//     description: '',
//     isbn:'',
//     stockQty:null,
//     //publisher:'',
//     publishedDate:'',
//     price: null,
//     photoUrl: '',
//     //authorName:'',
//     //categoryName:'',
//     categoryId:'',
//     publisherId:'',
//    // publisherName:'',
//     authorIds:[],
//     // categoryId
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       if (id) {
//         const response = await BookService.GetBooksDetails(id);
//         setValues({
//           id: response.id,
//           title: response.title,
//           description: response.description,
//           price:response.price,
//           isbn:response.isbn,
//           publishedDate:response.publishedDate,
//            stockQty: response.stockQty ?? null,
//          // groupId: response.groupId,
//           photoUrl: response.photoUrl || '',
//           // authorIds: response.authorIds || [],  // <-- array
//           // categoryId:response.categoryId,
//           //categoryName:response.categoryName,
//            publisherId:response.publisherId,
//            //publisherName:response.publisherName
//            authorIds: response.authorIds || [],
//            categoryId: response.category?.id || null
//         });

//         setImagePreview(response.photoUrl || null);
//       }
//     };
//     fetchData();
//   }, [id]);

// useEffect(() => {
//     const fetchAuthors = async () => {
//       const response = await BookService.GetAuthorSelectList();
//       setAuthorList(
//         response
//           .map((item, i) => ({
//               key: i,
//               value: item.id,   // me I të madhe
//               text: item.name,    // teksti që shfaqet në dropdow
//           }) as SelectListItem)
//           .filter((x) => x.text !== '' && x.text != null)
//       );
//     };

//    const fetchCategories = async () => {
//   const response = await BookService.GetCategorySelectList();
//   setCategoryList(
//     response
//       .map((item, i) => ({
//         key: i,
//         value: item.id,
//         text: item.name,
//       }) as SelectListItem)
//       .filter((x) => x.text !== '' && x.text != null)
//   );
// };
//     const fetchPublishers = async () => {
//   const response = await BookService.GetPublisherSelectList();
//   setPublisherList(
//     response
//       .map((item, i) => ({
//         key: i,
//         value: item.id,
//         text: item.name,
//       }) as SelectListItem)
//       .filter((x) => x.text !== '' && x.text != null)
//   );
// };

//     fetchAuthors();
//     fetchCategories();
//     fetchPublishers();
//   }, []);




//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();

//   try {
//     const formData = new FormData();

//      if (values.id) {
//       formData.append("id", values.id);
//     }

//     //formData.append("id", values.id || "");
//     formData.append("title", values.title || "");
//     formData.append("description", values.description || "");
//     formData.append("isbn", values.isbn || "");
//     formData.append("price", values.price?.toString() || "0");
//     formData.append("stockQty", values.stockQty?.toString() || "0");
//     formData.append("publishedDate", values.publishedDate || "");
//     formData.append("categoryId", values.categoryId || "");
//     formData.append("publisherId", values.publisherId || "");

//     if (selectedFile) {
//       formData.append("Photo", selectedFile);
//     }


//     (values.authorIds || []).forEach(id => formData.append("authorIds", id));

//      const response = await axios.put("https://localhost:7141/api/Book", formData, {
//   headers: { "Content-Type": "multipart/form-data" },
//     });

//     console.log("Book saved:", response.data);
//     navigate('/book');

//   } catch (error) {
//     console.error("Error saving book:", error);
//     if (axios.isAxiosError(error)) {
//       console.error("Axios error response:", error.response?.data);
//     }
//   }
// };


//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setValues({ ...values, [name]: value });

//      if (name === "isbn") {
//     if (!/^\d{13}$/.test(value)) {
//       setIsbnError("ISBN should only have 13 digits.");
//     } else {
//       setIsbnError(null);
//     }
//   }
//   };

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setValues({ ...values, [name]: value });
//   };
//  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setSelectedFile(file);

//       // Për preview e imazhit
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
//       <Segment
//         style={{
//           width: '600px',
//           padding: '30px',
//           backgroundColor: '#fff',
//           borderRadius: '10px',
//           boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
//           border: '1px solid #ccc',
//         }}
//       >
//         <h2 style={{ textAlign: 'center', fontFamily: 'Georgia', color: '#333' }}>
//           {values.id ? 'Edit Book' : 'Add Book'}
//         </h2>
//         <form className="ui form" onSubmit={handleSubmit} autoComplete="off">
//           <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//             <Image
//               src={imagePreview?.startsWith("data:")
//       ? imagePreview
//       : `https://localhost:7141${imagePreview || ''}`}

//                 //|| 'https://via.placeholder.com/150'}
//               size="small"
//               circular
//               centered
//               style={{ marginBottom: '10px' }}
//             />
//             <label className="ui icon button">
//               <Icon name="upload" />
//               Upload Photo
//               <input
//                 type="file"
//                 accept="image/*"
//                 hidden
//                 onChange={handleImageUpload}
//               />
//             </label>
//           </div>

//           <div className="field">
//             <label>Title</label>
//             <input
//               type="text"
//               placeholder="Enter name"
//               name="title"
//                value={values.title ?? ""}
//               onChange={handleChange}
//               required
//             />
//           </div>
//            <div className="field">
//             <label>ISBN</label>
//             <input
//               type="text"
//               placeholder="Enter ISBN"
//               name="isbn"
//               value={values.isbn ?? ""}
//               onChange={handleChange}
//               required
//             />
//              {isbnError && <p style={{ color: "red" }}>{isbnError}</p>}
//           </div>
//           <div className="field">
//             <label>Description</label>
//             <input
//               type="text"
//               placeholder="Enter description"
//               name="description"
//               value={values.description ?? ""}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="field">
//             <label>StockQty</label>
//             <input
//               type="number"
//               placeholder="Enter StockNumber"
//               name="stockQty"
//               value={values.stockQty ?? ""}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="field">
//             <label>Price</label>
//             <input
//               type="number"
//               placeholder="Enter Price"
//               name="price"
//               value={values.price ?? ""}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="field">
//             <label>Publisher Date</label>
//             <input
//               type="date"
//               placeholder="Enter PublishedDate"
//               name="publishedDate"
//               value={values.publishedDate ?? ""}
//               onChange={handleChange}
//               required
//             />
//           </div>


// <div className="field">
//   <label>AuthorName</label>
//   <Dropdown
//     placeholder='Select Authors'
//     fluid
//     multiple
//     selection
//     options={authorList.map(a => ({
//       key: a.key,
//       text: a.text,
//       value: a.value?.toString() || ""
//     }))}
//     value={values.authorIds}
//     onChange={(e, { value }) => 
//       setValues({ ...values, authorIds: value as string[] })}
//   />
// </div>


// <p>Selected authors: {authorList
//    .filter(a => (values.authorIds || []).includes(a.value!))
//   .map(a => a.text)
//   .join(", ")}</p>

          
//           <div className="field">
//             <label>CategoryName</label>
//             <select
//               className="ui dropdown"
//               name="categoryId"
//               value={values.categoryId || ""}
//               onChange={handleSelectChange}
//               required
//             >
//               <option value="">Select Category</option>
//               {categoryList.map((g) => (
//                 <option key={g.key} value={g.value!}>
//                   {g.text}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="field">
//             <label>PublisherName</label>
//             <select
//               className="ui dropdown"
//               name="publisherId"
//               value={values.publisherId || ""}
//               onChange={handleSelectChange}
//               required
//             >
//               <option value="">Select Publisher</option>
//               {publisherList.map((g) => (
//                 <option key={g.key} value={g.value!}>
//                   {g.text}
//                 </option>
//               ))}
//             </select>
//           </div>
           
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px' }}>
//             <button
//               type="button"
//               className="ui button"
//               onClick={() => navigate('/book')}
//               style={{ backgroundColor: '#ccc', color: '#000' }}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="ui green button"
//               style={{ backgroundColor: '#208769', color: '#fff' }}
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </Segment>
//     </div>
//   );
// }
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Segment, Image, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { SelectListItem } from '../Interfaces/SelectListItem';
import { BookModel } from '../Interfaces/BookModel';
import { BookService } from '../Services/BookService';
import { Dropdown } from 'semantic-ui-react';
import { CategoryModel } from '../Interfaces/CategoryModel';
import { PublisherModel } from '../Interfaces/PublisherModel';
import { AuthorModel } from '../Interfaces/AuthorModel';
export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

   //text: item.name,
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
   const [authorList, setAuthorList] = useState<SelectListItem[]>([]);
  const [categoryList, setCategoryList] = useState<SelectListItem[]>([]);
  const [publisherList, setPublisherList] = useState<SelectListItem[]>([]);
  const [isbnError, setIsbnError] = useState<string | null>(null);

  // const [categoryList, setCategoryList] = useState<CategoryModel[]>([]);

  const [values, setValues] = useState<BookModel>({
    id: id!,
    title: '',
    description: '',
    isbn:'',
    stockQty:null,
    //publisher:'',
    publishedDate:'',
    price: null,
    photoUrl: '',
    //authorName:'',
    //categoryName:'',
    categoryId:'',
    publisherId:'',
   // publisherName:'',
    authorIds:[],
    // categoryId
  });

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const response = await BookService.GetBooksDetails(id);
        setValues({
          id: response.id,
          title: response.title,
          description: response.description,
          price:response.price,
          isbn:response.isbn,
          publishedDate:response.publishedDate,
           stockQty: response.stockQty ?? null,
         // groupId: response.groupId,
          photoUrl: response.photoUrl || '',
          authorIds: response.authorIds || [],  // <-- array
          categoryId:response.categoryId,
          //categoryName:response.categoryName,
           publisherId:response.publisherId,
           //publisherName:response.publisherName
        });
        setImagePreview(response.photoUrl || null);
      }
    };
    fetchData();
  }, [id]);

useEffect(() => {
    const fetchAuthors = async () => {
      const response = await BookService.GetAuthorSelectList();
      setAuthorList(
        response
          .map((item, i) => ({
              key: i,
              value: item.id,   // me I të madhe
              text: item.name,    // teksti që shfaqet në dropdow
          }) as SelectListItem)
          .filter((x) => x.text !== '' && x.text != null)
      );
    };

   const fetchCategories = async () => {
  const response = await BookService.GetCategorySelectList();
  setCategoryList(
    response
      .map((item, i) => ({
        key: i,
        value: item.id,
        text: item.name,
      }) as SelectListItem)
      .filter((x) => x.text !== '' && x.text != null)
  );
};
    const fetchPublishers = async () => {
  const response = await BookService.GetPublisherSelectList();
  setPublisherList(
    response
      .map((item, i) => ({
        key: i,
        value: item.id,
        text: item.name,
      }) as SelectListItem)
      .filter((x) => x.text !== '' && x.text != null)
  );
};

    fetchAuthors();
    fetchCategories();
    fetchPublishers();
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const formData = new FormData();

     if (values.id) {
      formData.append("id", values.id);
    }

    //formData.append("id", values.id || "");
    formData.append("title", values.title || "");
    formData.append("description", values.description || "");
    formData.append("isbn", values.isbn || "");
    formData.append("price", values.price?.toString() || "0");
    formData.append("stockQty", values.stockQty?.toString() || "0");
    formData.append("publishedDate", values.publishedDate || "");
    formData.append("categoryId", values.categoryId || "");
    formData.append("publisherId", values.publisherId || "");

    if (selectedFile) {
      formData.append("Photo", selectedFile);
    }

    // if (values.authorIds && values.authorIds.length > 0) {
    //   values.authorIds.forEach((id) => formData.append("authorIds", id));
    // }

    (values.authorIds || []).forEach(id => formData.append("authorIds", id));
    //values.authorIds?.forEach(id => formData.append("authorIds", id));

     //formData.append("authorIds", JSON.stringify(values.authorIds || []));

     const response = await axios.post("https://localhost:7141/api/Book", formData, {
  headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Book saved:", response.data);
    navigate('/book');

  } catch (error) {
    console.error("Error saving book:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);
    }
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

     if (name === "isbn") {
    if (!/^\d{13}$/.test(value)) {
      setIsbnError("ISBN should only have 13 digits.");
    } else {
      setIsbnError(null);
    }
  }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
 const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Për preview e imazhit
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
      <Segment
        style={{
          width: '600px',
          padding: '30px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          border: '1px solid #ccc',
        }}
      >
        <h2 style={{ textAlign: 'center', fontFamily: 'Georgia', color: '#333' }}>
          {values.id ? 'Edit Book' : 'Add Book'}
        </h2>
        <form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Image
              src={imagePreview?.startsWith("data:")
      ? imagePreview
      : `https://localhost:7141${imagePreview || ''}`
  }

                //|| 'https://via.placeholder.com/150'}
              size="small"
              circular
              centered
              style={{ marginBottom: '10px' }}
            />
            <label className="ui icon button">
              <Icon name="upload" />
              Upload Photo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </label>
          </div>

          <div className="field">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter name"
              name="title"
               value={values.title ?? ""}
              onChange={handleChange}
              required
            />
          </div>
           <div className="field">
            <label>ISBN</label>
            <input
              type="text"
              placeholder="Enter ISBN"
              name="isbn"
              value={values.isbn ?? ""}
              onChange={handleChange}
              required
            />
             {isbnError && <p style={{ color: "red" }}>{isbnError}</p>}
          </div>
          <div className="field">
            <label>Description</label>
            <input
              type="text"
              placeholder="Enter description"
              name="description"
              value={values.description ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <label>StockQty</label>
            <input
              type="number"
              placeholder="Enter StockNumber"
              name="stockQty"
              value={values.stockQty ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <label>Price</label>
            <input
              type="number"
              placeholder="Enter Price"
              name="price"
              value={values.price ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <label>Publisher Date</label>
            <input
              type="date"
              placeholder="Enter PublishedDate"
              name="publishedDate"
              value={values.publishedDate ?? ""}
              onChange={handleChange}
              required
            />
          </div>


<div className="field">
  <label>AuthorName</label>
  <Dropdown
    placeholder='Select Authors'
    fluid
    multiple
    selection
    options={authorList.map(a => ({
      key: a.key,
      text: a.text,
      value: a.value?.toString() || ""
    }))}
    value={values.authorIds}
    onChange={(e, { value }) => 
      setValues({ ...values, authorIds: value as string[] })}
  />
</div>


<p>Selected authors: {authorList
   .filter(a => (values.authorIds || []).includes(a.value!))
  .map(a => a.text)
  .join(", ")}</p>

          
          <div className="field">
            <label>CategoryName</label>
            <select
              className="ui dropdown"
              name="categoryId"
              value={values.categoryId || ""}
              onChange={handleSelectChange}
              required
            >
              <option value="">Select Category</option>
              {categoryList.map((g) => (
                <option key={g.key} value={g.value!}>
                  {g.text}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>PublisherName</label>
            <select
              className="ui dropdown"
              name="publisherId"
              value={values.publisherId || ""}
              onChange={handleSelectChange}
              required
            >
              <option value="">Select Publisher</option>
              {publisherList.map((g) => (
                <option key={g.key} value={g.value!}>
                  {g.text}
                </option>
              ))}
            </select>
          </div>
           
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px' }}>
            <button
              type="button"
              className="ui button"
              onClick={() => navigate('/book')}
              style={{ backgroundColor: '#ccc', color: '#000' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ui green button"
              style={{ backgroundColor: '#208769', color: '#fff' }}
            >
              Save
            </button>
          </div>
        </form>
      </Segment>
    </div>
  );
}

