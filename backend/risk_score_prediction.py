import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

# Load your dataset
df = pd.read_csv('final_df.csv')  # replace with your actual file path

# Select features and target
features = ['crime_rate_per_100000', 'disaster_count', 'median_house_price']
df = df.dropna(subset=features)  # Handle missing values if any in the selected columns

# Define target as a custom risk score based on these factors (if you don’t have a target column)
df['risk_score'] = df['crime_rate_per_100000'] + df['disaster_count'] - df['median_house_price'] / 1000

# Split features and target
X = df[features]
y = df['risk_score']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train a Random Forest Regressor
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test_scaled)

# Evaluate the model
print("Mean Absolute Error:", mean_absolute_error(y_test, y_pred))

# Function to predict risk score for a new ZIP code
def predict_risk(crime_rate, disaster_count, median_house_price):
    data = pd.DataFrame([[crime_rate, disaster_count, median_house_price]], columns=features)
    data_scaled = scaler.transform(data)
    risk_score = model.predict(data_scaled)
    return risk_score[0]

# Example usage:
crime_rate = 1754.91  # replace with actual crime rate per 100,000 for your target ZIP code
disaster_count = 100  # replace with actual disaster count
median_house_price = 109237.95  # replace with actual median house price
predicted_risk_score = predict_risk(crime_rate, disaster_count, median_house_price)

print("Predicted Risk Score:", predicted_risk_score)
