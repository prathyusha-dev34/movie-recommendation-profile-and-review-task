from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.review import Review
from app.models.viewed_movie import ViewedMovie
from app.schemas.review import ReviewCreate, ReviewUpdate

router = APIRouter(
    prefix="/reviews",
    tags=["Reviews"]
)

CURRENT_USER_ID = 1


# =========================
# ADD REVIEW
# =========================
@router.post("/{movie_id}")
def add_review(
    movie_id: int,
    data: ReviewCreate,
    db: Session = Depends(get_db)
):
    movie = db.query(ViewedMovie).filter(
        ViewedMovie.id == movie_id
    ).first()

    if not movie:
        raise HTTPException(
            status_code=404,
            detail="Movie not found"
        )

    existing = db.query(Review).filter(
        Review.user_id == CURRENT_USER_ID,
        Review.movie_id == movie_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="You already reviewed this movie"
        )

    review = Review(
        user_id=CURRENT_USER_ID,
        movie_id=movie_id,
        rating=data.rating,
        comment=data.comment
    )

    db.add(review)
    db.commit()
    db.refresh(review)

    return review


# =========================
# GET REVIEWS
# =========================
@router.get("/{movie_id}")
def get_reviews(
    movie_id: int,
    db: Session = Depends(get_db)
):
    reviews = db.query(Review).filter(
        Review.movie_id == movie_id
    ).all()

    return reviews


# =========================
# UPDATE REVIEW
# =========================
@router.put("/{movie_id}")
def update_review(
    movie_id: int,
    data: ReviewUpdate,
    db: Session = Depends(get_db)
):
    review = db.query(Review).filter(
        Review.movie_id == movie_id,
        Review.user_id == CURRENT_USER_ID
    ).first()

    if not review:
        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    review.rating = data.rating
    review.comment = data.comment

    db.commit()

    return {"message": "Review updated successfully"}


# =========================
# DELETE REVIEW
# =========================
@router.delete("/{movie_id}")
def delete_review(
    movie_id: int,
    db: Session = Depends(get_db)
):
    review = db.query(Review).filter(
        Review.movie_id == movie_id,
        Review.user_id == CURRENT_USER_ID
    ).first()

    if not review:
        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    db.delete(review)
    db.commit()

    return {"message": "Review deleted successfully"}


# =========================
# AVERAGE RATING
# =========================
@router.get("/{movie_id}/average")
def average_rating(
    movie_id: int,
    db: Session = Depends(get_db)
):
    avg = db.query(
        func.avg(Review.rating)
    ).filter(
        Review.movie_id == movie_id
    ).scalar()

    return {
        "movie_id": movie_id,
        "average_rating": round(avg or 0, 2)
    }