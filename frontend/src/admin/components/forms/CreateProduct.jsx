import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Alert,
  Snackbar,
  LinearProgress,
  Typography,
  IconButton,
  Paper,
  Container,
  Divider,
} from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  addProduct,
  editProduct,
} from "../../../features/products/productSlice";
import { useDispatch } from "react-redux";

// Styled components for drag & drop
const DragDropArea = styled(Paper)(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",
  backgroundColor: theme.palette.background.default,
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

const ImagePreview = styled(Paper)(({ theme }) => ({
  position: "relative",
  width: "100%",
  paddingTop: "100%", // 1:1 Aspect Ratio
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  cursor: "pointer",
  "&:hover .delete-button": {
    opacity: 1,
  },
}));

const AddOrEditProduct = ({ product = null }) => {
  const dispatch = useDispatch();

  const isEditMode = Boolean(product);
  const [formData, setFormData] = useState({
    productName: product?.productName || "",
    description: product?.description || "",
    price: product?.price || "",
    stockQuantity: product?.stockQuantity || "",
    category: product?.category || "",
  });

  // Images state
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  // Validation state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Categories
  const categories = [
    { value: "panels", label: "Solar Panels" },
    { value: "batteries", label: "Batteries" },
    { value: "inverters", label: "Inverters" },
  ];

  // Validation function
  const validateField = (name, value) => {
    switch (name) {
      case "productName":
        return !value?.trim() ? "Product name is required" : "";
      case "description":
        return !value?.trim()
          ? "Description is required"
          : value.trim().length < 20
            ? "Description must be at least 20 characters"
            : "";
      case "price":
        return !value
          ? "Price is required"
          : parseFloat(value) <= 0
            ? "Price must be greater than 0"
            : "";
      case "stockQuantity":
        return value === ""
          ? "Stock quantity is required"
          : parseInt(value) < 0
            ? "Stock must be 0 or greater"
            : "";
      case "category":
        return !value ? "Category is required" : "";
      default:
        return "";
    }
  };

  const validateImages = () => {
    return images.length < 3 ? "At least 3 images are required" : "";
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    const imagesError = validateImages();
    if (imagesError) newErrors.images = imagesError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Image handling
  const simulateUpload = (file) => {
    return new Promise((resolve) => {
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: Math.min((prev[file.name] || 0) + 20, 100),
        }));
      }, 100);

      setTimeout(() => {
        clearInterval(progressInterval);
        setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));
        resolve();
      }, 500);
    });
  };

  const handleImageUpload = async (files) => {
    const fileArray = Array.from(files);
    const newImages = [...images];

    for (const file of fileArray) {
      if (file.type.startsWith("image/")) {
        setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));
        await simulateUpload(file);

        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push({
            id: `${file.name}-${Date.now()}`,
            file,
            preview: reader.result,
            name: file.name,
          });
          setImages((prev) => [
            ...prev,
            {
              id: `${file.name}-${Date.now()}`,
              file,
              preview: reader.result,
              name: file.name,
            },
          ]);
          // Clear images error if we have at least 3
          if (newImages.length >= 3 && errors.images) {
            setErrors((prev) => ({ ...prev, images: "" }));
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    handleImageUpload(files);
  };

  const removeImage = (imageId) => {
    setImages(images.filter((img) => img.id !== imageId));
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      const imageToRemove = images.find((img) => img.id === imageId);
      if (imageToRemove) {
        delete newProgress[imageToRemove.name];
      }
      return newProgress;
    });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: "Veuillez corriger les erreurs de validation",
        severity: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("productName", formData.productName);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("stockQuantity", formData.stockQuantity);
      formDataToSend.append("category", formData.category);

      // images (REAL FILES)
      images.forEach((img, index) => {
        formDataToSend.append(`images[${index}]`, img.file);
      });

      if (isEditMode) {
        await dispatch(
          editProduct({
            id: product.id,
            data: formDataToSend,
          }),
        ).unwrap();
      } else {
        await dispatch(addProduct(formDataToSend)).unwrap();
      }

      setSnackbar({
        open: true,
        message: isEditMode
          ? "Produit modifié avec succès !"
          : "Produit créé avec succès !",
        severity: "success",
      });

      // reset
      setFormData({
        productName: "",
        description: "",
        price: "",
        stockQuantity: "",
        category: "",
      });

      setImages([]);
      setErrors({});
      setTouched({});
    } catch (error) {
      setSnackbar({
        open: true,
        message: error?.response?.data?.message || "Error creating product",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      Object.values(errors).every((e) => !e) &&
      formData.productName &&
      formData.description &&
      formData.price &&
      formData.stockQuantity &&
      formData.category &&
      images.length >= 3 &&
      !isSubmitting
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Card elevation={3}>
        <CardHeader
          title={isEditMode ? "Modifier le produit" : "Ajouter un produit"}
          subheader={
            isEditMode
              ? "Mettez à jour les informations du produit"
              : "Remplissez les informations du produit ci-dessous"
          }
          sx={{
            color: "primary.main",
          }}
        />

        <CardContent sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Product Name */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.productName && !!errors.productName}
                  helperText={touched.productName && errors.productName}
                  required
                />
              </Grid>

              {/* Description */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && !!errors.description}
                  helperText={
                    touched.description && errors.description
                      ? errors.description
                      : "Provide a detailed description of the product (minimum 20 characters)"
                  }
                  required
                  multiline
                  rows={4}
                  placeholder="Describe the product features, specifications, and benefits..."
                />
              </Grid>

              {/* Price and Stock */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">MAD</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Stock Quantity"
                  name="stockQuantity"
                  type="number"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.stockQuantity && !!errors.stockQuantity}
                  helperText={touched.stockQuantity && errors.stockQuantity}
                  required
                />
              </Grid>

              {/* Category */}
              <Grid size={{ xs: 12 }}>
                <FormControl
                  fullWidth
                  error={touched.category && !!errors.category}
                  required
                >
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Category"
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.category && errors.category && (
                    <FormHelperText>{errors.category}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* Images Upload */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Product Images
                  <Typography component="span" color="error" sx={{ ml: 1 }}>
                    *
                  </Typography>
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  display="block"
                  gutterBottom
                >
                  Upload at least 3 images ({images.length}/3 uploaded)
                </Typography>

                <DragDropArea
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() =>
                    document.getElementById("image-upload-input").click()
                  }
                >
                  <input
                    id="image-upload-input"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    style={{ display: "none" }}
                  />
                  <CloudUploadIcon
                    sx={{ fontSize: 48, color: "action.active", mb: 2 }}
                  />
                  <Typography variant="body1" gutterBottom>
                    Drag & drop images here or click to browse
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Supports: JPG, PNG, GIF (Max 5MB each)
                  </Typography>
                </DragDropArea>

                {errors.images && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {errors.images}
                  </Alert>
                )}

                {/* Image Previews */}
                {images.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      {images.map((image) => (
                        <Grid size={{ xs: 6, sm: 4, md: 3 }} key={image.id}>
                          <ImagePreview>
                            <img
                              src={image.preview}
                              alt={image.name}
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                            {uploadProgress[image.name] !== undefined &&
                              uploadProgress[image.name] < 100 && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                  }}
                                >
                                  <LinearProgress
                                    variant="determinate"
                                    value={uploadProgress[image.name]}
                                    sx={{ height: 3 }}
                                  />
                                </Box>
                              )}
                            <IconButton
                              className="delete-button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(image.id);
                              }}
                              sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                backgroundColor: "rgba(0,0,0,0.5)",
                                color: "white",
                                opacity: 0,
                                transition: "opacity 0.2s",
                                "&:hover": {
                                  backgroundColor: "error.main",
                                },
                              }}
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ImagePreview>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Grid>

              {/* Submit Button */}
              <Grid size={{ xs: 12 }}>
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setFormData({
                        productName: "",
                        description: "",
                        price: "",
                        stockQuantity: "",
                        category: "",
                      });
                      setImages([]);
                      setErrors({});
                      setTouched({});
                    }}
                  >
                    Clear
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!isFormValid()}
                    sx={{
                      minWidth: 150,
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #5a67d8 0%, #6b46a0 100%)",
                      },
                    }}
                  >
                    {isSubmitting
                      ? isEditMode
                        ? "Modification..."
                        : "Création..."
                      : isEditMode
                        ? "Modifier le produit"
                        : "Créer le produit"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddOrEditProduct;
