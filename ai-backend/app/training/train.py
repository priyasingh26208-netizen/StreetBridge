import pandas as pd
import pickle

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score


# 1. Load dataset
dataset_path = "app/data/dataset.csv"

df = pd.read_csv(dataset_path)

print("Dataset loaded successfully.")
print(f"Total examples: {len(df)}")


# 2. Split input and output
X = df["text"]
y = df["intent"]


# 3. Split training and testing data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)


# 4. Create the ML pipeline
model = Pipeline([
    (
        "tfidf",
        TfidfVectorizer(
            lowercase=True,
            analyzer="char_wb",
            ngram_range=(3, 5),
            min_df=1
        )
    ),
    (
        "classifier",
        LogisticRegression(
            max_iter=1000
        )
    )
])


# 5. Train the model
print("Training model...")

model.fit(X_train, y_train)

print("Training completed.")


# 6. Test the model
predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print(f"Model accuracy: {accuracy:.2f}")


# 7. Save trained model
model_path = "app/model/vendor_intent_model.pkl"

with open(model_path, "wb") as file:
    pickle.dump(model, file)

print(f"Model saved to: {model_path}")