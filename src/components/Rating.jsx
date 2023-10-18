import { getDatabase, set, get } from "firebase/database";

const Rating = () => {
  return (
    <>
      <div>
        <label>Rating</label>
        <input type="number" min="1" max="5" id="quantity" name="quantity" />
      </div>
    </>
  );
};

export default Rating;

/* use firebase realtime databse to store the rating like you did with
 comments and then take an average of these ratings to display to 
 everyone who are not logged in and this should be displayed above the rating input*/

/*                           Rating: _/5 (this is avg rating)
                   rating by you: _/5 (this is rating by authenticated user)

                   
                   */
