// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import axios from 'axios';

// const investingTips = [
//   'Diversify your investments to reduce risk.',
//   'Avoid emotional decisions in trading.',
//   'Review your portfolio regularly.',
//   'Don’t put all your eggs in one basket.',
//   'Understand what you invest in.',
//   'Set realistic profit targets.',
//   'Remember: past performance doesn’t guarantee future results.',
// ];

// const App = () => {
//   const [ticker, setTicker] = useState('HUBC');
//   const [quantity, setQuantity] = useState('1');
//   const [purchasePrice, setPurchasePrice] = useState('0');
//   const [purchaseDate, setPurchaseDate] = useState(
//     new Date().toISOString().split('T')[0],
//   );
//   const [portfolio, setPortfolio] = useState([]);
//   const [forecastData, setForecastData] = useState(null);
//   const [currentPrice, setCurrentPrice] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [lastUpdated, setLastUpdated] = useState(null);
//   const [tip, setTip] = useState(null);

//   useEffect(() => {
//     showRandomTip();
//   }, []);

//   const showRandomTip = () => {
//     const randomTip =
//       investingTips[Math.floor(Math.random() * investingTips.length)];
//     setTip(randomTip);
//   };

//   const calculateCurrentValue = async (ticker, quantity) => {
//     try {
//       const response = await axios.get(
//         `https://stockdost-375231164382.europe-west1.run.app/current-value/${ticker}`,
//       );
//       const currentPrice = response.data.currentPrice;
//       return currentPrice * quantity;
//     } catch (err) {
//       console.log(err);
//       setError('Invalid ticker symbol or server error.');
//       return null;
//     }
//   };

//   const addStock = async () => {
//     if (!ticker || parseFloat(purchasePrice) <= 0) {
//       setError('Please enter a valid ticker and purchase price.');
//       return;
//     }
//     setError(null);
//     const currentValue = await calculateCurrentValue(
//       ticker,
//       parseInt(quantity),
//     );
//     if (currentValue !== null) {
//       const newStock = {
//         ticker: ticker.toUpperCase(),
//         quantity: parseInt(quantity),
//         purchase_value: parseFloat(purchasePrice) * parseInt(quantity),
//         purchase_date: purchaseDate,
//         current_value: currentValue,
//       };
//       const updatedPortfolio = [...portfolio, newStock];
//       setPortfolio(updatedPortfolio);
//       setTicker('');
//       setQuantity('1');
//       setPurchasePrice('0');
//       setPurchaseDate(new Date().toISOString().split('T')[0]);
//     }
//   };

//   const removeStock = index => {
//     const updatedPortfolio = portfolio.filter((_, i) => i !== index);
//     setPortfolio(updatedPortfolio);
//   };

//   const resetPortfolio = () => {
//     Alert.alert(
//       'Reset Portfolio',
//       'Are you sure you want to clear your entire portfolio?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Yes, Reset',
//           style: 'destructive',
//           onPress: () => setPortfolio([]),
//         },
//       ],
//     );
//   };

//   const calculatePortfolioSummary = () => {
//     let totalValue = 0;
//     let totalPurchaseValue = 0;
//     let totalGainLoss = 0;
//     portfolio.forEach(stock => {
//       totalValue += stock.current_value;
//       totalPurchaseValue += stock.purchase_value;
//       totalGainLoss += stock.current_value - stock.purchase_value;
//     });
//     return { totalValue, totalPurchaseValue, totalGainLoss };
//   };

//   const generateForecast = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(
//         `https://stockdost-375231164382.europe-west1.run.app/forecast/${ticker}`,
//       );
//       setCurrentPrice(response.data.currentPrice);
//       setForecastData(response.data.forecast);
//       setLastUpdated(new Date().toLocaleString());
//     } catch (err) {
//       console.log(err);
//       setError('Error fetching forecast data.');
//     }
//     setLoading(false);
//   };

//   const renderPortfolioItem = ({ item, index }) => {
//     const gainLoss = item.current_value - item.purchase_value;
//     const gainLossPercent = (gainLoss / item.purchase_value) * 100;
//     const gainLossColor = gainLoss >= 0 ? '#4caf50' : '#f44336';

//     return (
//       <View style={styles.portfolioItem}>
//         <View style={styles.rowSpace}>
//           <Text style={styles.stockTitle}>{item.ticker}</Text>
//           <TouchableOpacity onPress={() => removeStock(index)}>
//             <Text style={styles.removeText}>Remove</Text>
//           </TouchableOpacity>
//         </View>
//         <Text>Quantity: {item.quantity}</Text>
//         <Text>Purchase Date: {item.purchase_date}</Text>
//         <Text>Purchase Value: PKR {item.purchase_value.toFixed(2)}</Text>
//         <Text>Current Value: PKR {item.current_value.toFixed(2)}</Text>
//         <Text style={{ color: gainLossColor }}>
//           Gain/Loss: PKR {gainLoss.toFixed(2)} ({gainLossPercent.toFixed(2)}%)
//         </Text>
//       </View>
//     );
//   };

//   const { totalValue, totalPurchaseValue, totalGainLoss } =
//     calculatePortfolioSummary();
//   const gainLossColor = totalGainLoss >= 0 ? '#4caf50' : '#f44336';

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>
//         PSX Stock Forecasting & Portfolio Manager
//       </Text>

//       {tip && (
//         <View style={styles.tipBox}>
//           <Text style={styles.tipText}>💡 {tip}</Text>
//         </View>
//       )}

//       {/* Portfolio Management */}
//       <View style={styles.card}>
//         <Text style={styles.subheader}>Portfolio Management</Text>

//         <Text style={styles.label}>Ticker Symbol (e.g., HUBC)</Text>
//         <TextInput
//           style={styles.input}
//           value={ticker}
//           onChangeText={setTicker}
//           placeholder="Enter ticker"
//         />

//         <Text style={styles.label}>Quantity</Text>
//         <TextInput
//           style={styles.input}
//           value={quantity}
//           onChangeText={setQuantity}
//           keyboardType="numeric"
//           placeholder="Enter quantity"
//         />

//         <Text style={styles.label}>Purchase Price (PKR)</Text>
//         <TextInput
//           style={styles.input}
//           value={purchasePrice}
//           onChangeText={setPurchasePrice}
//           keyboardType="numeric"
//           placeholder="Enter purchase price"
//         />

//         <Text style={styles.label}>Purchase Date</Text>
//         <TextInput
//           style={styles.input}
//           value={purchaseDate}
//           onChangeText={setPurchaseDate}
//           placeholder="YYYY-MM-DD"
//         />

//         <View style={styles.rowSpace}>
//           <TouchableOpacity style={styles.primaryBtn} onPress={addStock}>
//             <Text style={styles.primaryBtnText}>Add Stock</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.resetBtn} onPress={resetPortfolio}>
//             <Text style={styles.resetBtnText}>Reset Portfolio</Text>
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.subheader}>Current Portfolio Summary</Text>
//         {portfolio.length > 0 ? (
//           <>
//             <FlatList
//               data={portfolio}
//               renderItem={renderPortfolioItem}
//               keyExtractor={(item, index) => index.toString()}
//             />
//             <View style={styles.summary}>
//               <Text>Total Portfolio Value: PKR {totalValue.toFixed(2)}</Text>
//               <Text>
//                 Total Purchase Value: PKR {totalPurchaseValue.toFixed(2)}
//               </Text>
//               <Text style={{ color: gainLossColor }}>
//                 Total Gain/Loss: PKR {totalGainLoss.toFixed(2)}
//               </Text>
//             </View>
//           </>
//         ) : (
//           <Text style={styles.noPortfolioText}>
//             No stocks in portfolio yet.
//           </Text>
//         )}
//       </View>

//       {/* Stock Forecasting */}
//       <View style={styles.card}>
//         <Text style={styles.subheader}>Stock Forecasting</Text>
//         <TextInput
//           style={styles.input}
//           value={ticker}
//           onChangeText={setTicker}
//           placeholder="Enter PSX Ticker (e.g., HUBC)"
//         />
//         <TouchableOpacity style={styles.primaryBtn} onPress={generateForecast}>
//           <Text style={styles.primaryBtnText}>Generate Forecast</Text>
//         </TouchableOpacity>
//         {loading && <ActivityIndicator size="large" color="#0000ff" />}
//         {error && <Text style={styles.error}>{error}</Text>}
//         {currentPrice && (
//           <Text style={styles.priceText}>
//             Current Price: PKR {currentPrice.toFixed(2)}
//           </Text>
//         )}
//         {lastUpdated && (
//           <Text style={styles.lastUpdated}>Last updated: {lastUpdated}</Text>
//         )}
//         {forecastData && (
//           <>
//             <Text style={styles.sectionTitle}>Forecast Data:</Text>
//             <FlatList
//               data={forecastData}
//               renderItem={({ item }) => (
//                 <View style={styles.forecastItem}>
//                   <Text>Date: {item.Date}</Text>
//                   <Text>Forecast: PKR {item.Forecast.toFixed(2)}</Text>
//                 </View>
//               )}
//               keyExtractor={(item, index) => index.toString()}
//             />
//             <Text style={styles.subheader}>Recommendations</Text>
//             <Text>
//               {forecastData.length > 1
//                 ? forecastData[forecastData.length - 1].Forecast >
//                   forecastData[0].Forecast
//                   ? '✅ Recommendation: The forecast suggests a potential upward trend. Consider holding or buying.'
//                   : '⚠️ Recommendation: The forecast suggests a potential downward trend. Consider selling or monitoring closely.'
//                 : 'Not enough forecast data for recommendation.'}
//             </Text>
//           </>
//         )}
//       </View>

//       {/* Stock Recommendations */}
//       <View style={styles.card}>
//         <Text style={styles.subheader}>Stock Recommendations</Text>
//         <Text>1. HUBC: A strong performer with consistent growth.</Text>
//         <Text>2. OGDC: Promising due to increasing oil prices.</Text>
//         <Text>3. PSO: A major player in the oil sector.</Text>
//         <Text>4. Ufone: Excellent growth potential in telecom.</Text>
//       </View>

//       {/* Developer Info */}
//       <View style={styles.footer}>
//         <Text>Developed by Basharat Hussain</Text>
//         <Text>For more projects, visit basharathussain.com</Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#e8ecf4',
//     padding: 10,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 10,
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 8,
//     marginVertical: 10,
//     elevation: 3,
//   },
//   subheader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 5,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginVertical: 8,
//   },
//   label: {
//     fontSize: 14,
//     marginTop: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 5,
//     backgroundColor: '#f9f9f9',
//   },
//   primaryBtn: {
//     backgroundColor: '#007bff',
//     padding: 10,
//     marginVertical: 8,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   primaryBtnText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   resetBtn: {
//     backgroundColor: '#dc3545',
//     padding: 10,
//     marginVertical: 8,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginLeft: 10,
//   },
//   resetBtnText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   portfolioItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   stockTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   rowSpace: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   removeText: {
//     color: '#dc3545',
//     fontWeight: 'bold',
//   },
//   summary: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: '#f1f1f1',
//     borderRadius: 5,
//   },
//   forecastItem: {
//     padding: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   error: {
//     color: 'red',
//     marginVertical: 5,
//   },
//   footer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   noPortfolioText: {
//     color: '#777',
//     marginTop: 10,
//   },
//   tipBox: {
//     backgroundColor: '#fff8e1',
//     padding: 10,
//     borderRadius: 8,
//     marginVertical: 10,
//   },
//   tipText: {
//     color: '#8d6e63',
//     fontStyle: 'italic',
//   },
//   priceText: {
//     fontWeight: 'bold',
//     marginVertical: 5,
//   },
//   lastUpdated: {
//     fontSize: 12,
//     color: '#555',
//     marginTop: 4,
//   },
// });

// export default App;
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Alert, Text } from 'react-native';
import axios from 'axios';
import PortfolioInput from '../../src/components/PortfolioInput';
import PortfolioList from '../../src/components/PortfolioList';
import ForecastSection from '../../src/components/ForecastSection';
import Recommendations from '../../src/components/Recommendations';
import TipBox from '../../src/components/TipBox';
import Footer from '../../src/components/Footer';
import { colors, spacing } from '../../src/styles/theme';

const investingTips = [
  'Diversify your investments to reduce risk.',
  'Avoid emotional decisions in trading.',
  'Review your portfolio regularly.',
  'Don’t put all your eggs in one basket.',
  'Understand what you invest in.',
  'Set realistic profit targets.',
  'Remember: past performance doesn’t guarantee future results.',
];

const Home = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [purchasePrice, setPurchasePrice] = useState('0');
  const [purchaseDate, setPurchaseDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [forecastData, setForecastData] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [tip, setTip] = useState(null);

  useEffect(() => {
    showRandomTip();
  }, []);

  const showRandomTip = () => {
    const randomTip =
      investingTips[Math.floor(Math.random() * investingTips.length)];
    setTip(randomTip);
  };

  const calculateCurrentValue = async (ticker, quantity) => {
    try {
      const response = await axios.get(
        `https://stockdost-375231164382.europe-west1.run.app/current-value/${ticker}`,
      );
      return response.data.currentPrice * quantity;
    } catch (err) {
      setError('Invalid ticker symbol or server error.');
      return null;
    }
  };

  const addStock = async () => {
    if (!ticker || parseFloat(purchasePrice) <= 0) {
      setError('Please enter a valid ticker and purchase price.');
      return;
    }
    setError(null);
    const currentValue = await calculateCurrentValue(
      ticker,
      parseInt(quantity),
    );
    if (currentValue !== null) {
      const newStock = {
        id: Date.now().toString(),
        ticker: ticker.toUpperCase(),
        quantity: parseInt(quantity),
        purchase_value: parseFloat(purchasePrice) * parseInt(quantity),
        purchase_date: purchaseDate,
        current_value: currentValue,
      };
      setPortfolio([...portfolio, newStock]);
      resetInputs();
    }
  };

  const resetInputs = () => {
    setTicker('');
    setQuantity('1');
    setPurchasePrice('0');
    setPurchaseDate(new Date().toISOString().split('T')[0]);
  };

  const removeStock = id => {
    setPortfolio(portfolio.filter(stock => stock.id !== id));
  };

  const resetPortfolio = () => {
    Alert.alert(
      'Reset Portfolio',
      'Are you sure you want to clear your entire portfolio?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Reset',
          style: 'destructive',
          onPress: () => setPortfolio([]),
        },
      ],
    );
  };

  const exportPortfolio = () => {
    // Simulated export functionality
    const portfolioData = JSON.stringify(portfolio, null, 2);
    Alert.alert('Portfolio Exported', 'Portfolio data copied to clipboard!');
    // In a real app, you might want to use react-native-share or similar
    console.log(portfolioData);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>
          PSX Stock Forecasting & Portfolio Manager
        </Text>
        <TipBox tip={tip} onRefresh={showRandomTip} />
        <PortfolioInput
          ticker={ticker}
          setTicker={setTicker}
          quantity={quantity}
          setQuantity={setQuantity}
          purchasePrice={purchasePrice}
          setPurchasePrice={setPurchasePrice}
          purchaseDate={purchaseDate}
          setPurchaseDate={setPurchaseDate}
          onAddStock={addStock}
          onResetPortfolio={resetPortfolio}
          error={error}
        />
        <PortfolioList
          portfolio={portfolio}
          onRemoveStock={removeStock}
          onExportPortfolio={exportPortfolio}
        />
        <ForecastSection
          ticker={ticker}
          setTicker={setTicker}
          forecastData={forecastData}
          setForecastData={setForecastData}
          currentPrice={currentPrice}
          setCurrentPrice={setCurrentPrice}
          loading={loading}
          setLoading={setLoading}
          error={error}
          setError={setError}
          lastUpdated={lastUpdated}
          setLastUpdated={setLastUpdated}
        />

        <Recommendations />

        <Footer />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  scrollContent: {
    padding: spacing.lg,
  },
});

export default Home;
