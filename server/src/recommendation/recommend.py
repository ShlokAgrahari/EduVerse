from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)


@app.route("/recommend",methods=["POST"])


def recommend():
    request_data = request.json
    purchased_course = request_data.get("purchasedCourse")
    all_course = request_data.get("allCourse")

    df = pd.DataFrame(all_course)

    df["combined"] = df["title"]+" "+df["category"]

    vectorizer = TfidfVectorizer(stop_words = "english")
    tfidf_matrix = vectorizer.fit_transform(df["combined"])

    purchased_ind = [df.index[df["_id"]==item["_id"]].tolist()[0] for item in purchased_course]

    use_vector = tfidf_matrix[purchased_ind].mean(axis=0)
    use_vector = np.asarray(use_vector).reshape(1, -1)
    similarity_score = cosine_similarity(use_vector,tfidf_matrix).flatten()

    recommended_indices = [i for i in similarity_score.argsort()[::-1] if i not in purchased_ind]
    recommended_course = [{"course_id": df.iloc[i]["_id"]}for i in recommended_indices[:5]]

    return jsonify({"recommendations": recommended_course})


if __name__ == '__main__':
    app.run(debug=True)