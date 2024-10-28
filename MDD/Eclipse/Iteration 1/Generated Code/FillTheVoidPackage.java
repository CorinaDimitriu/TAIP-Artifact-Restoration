/**
 */
package com.garagu.emf.fillthevoid.model.FillTheVoid;

import org.eclipse.emf.ecore.EAttribute;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.EReference;

/**
 * <!-- begin-user-doc -->
 * The <b>Package</b> for the model.
 * It contains accessors for the meta objects to represent
 * <ul>
 *   <li>each class,</li>
 *   <li>each feature of each class,</li>
 *   <li>each operation of each class,</li>
 *   <li>each enum,</li>
 *   <li>and each data type</li>
 * </ul>
 * <!-- end-user-doc -->
 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidFactory
 * @model kind="package"
 * @generated
 */
public interface FillTheVoidPackage extends EPackage {
	/**
	 * The package name.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	String eNAME = "FillTheVoid";

	/**
	 * The package namespace URI.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	String eNS_URI = "http://www.example.org/FillTheVoid";

	/**
	 * The package namespace name.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	String eNS_PREFIX = "FillTheVoid";

	/**
	 * The singleton instance of the package.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	FillTheVoidPackage eINSTANCE = com.garagu.emf.fillthevoid.model.FillTheVoid.impl.FillTheVoidPackageImpl.init();

	/**
	 * The meta object id for the '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.impl.GalleryImpl <em>Gallery</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.impl.GalleryImpl
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.impl.FillTheVoidPackageImpl#getGallery()
	 * @generated
	 */
	int GALLERY = 0;

	/**
	 * The feature id for the '<em><b>Id</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int GALLERY__ID = 0;

	/**
	 * The feature id for the '<em><b>Gallery Name</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int GALLERY__GALLERY_NAME = 1;

	/**
	 * The feature id for the '<em><b>Description</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int GALLERY__DESCRIPTION = 2;

	/**
	 * The feature id for the '<em><b>Is Default</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int GALLERY__IS_DEFAULT = 3;

	/**
	 * The feature id for the '<em><b>Paintings</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int GALLERY__PAINTINGS = 4;

	/**
	 * The number of structural features of the '<em>Gallery</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int GALLERY_FEATURE_COUNT = 5;

	/**
	 * The number of operations of the '<em>Gallery</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int GALLERY_OPERATION_COUNT = 0;

	/**
	 * The meta object id for the '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.impl.PaintingImpl <em>Painting</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.impl.PaintingImpl
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.impl.FillTheVoidPackageImpl#getPainting()
	 * @generated
	 */
	int PAINTING = 1;

	/**
	 * The feature id for the '<em><b>Id</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int PAINTING__ID = 0;

	/**
	 * The feature id for the '<em><b>Image Name</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int PAINTING__IMAGE_NAME = 1;

	/**
	 * The feature id for the '<em><b>Description</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int PAINTING__DESCRIPTION = 2;

	/**
	 * The feature id for the '<em><b>Author</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int PAINTING__AUTHOR = 3;

	/**
	 * The feature id for the '<em><b>No Visualizations</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int PAINTING__NO_VISUALIZATIONS = 4;

	/**
	 * The feature id for the '<em><b>Comments</b></em>' attribute list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int PAINTING__COMMENTS = 5;

	/**
	 * The feature id for the '<em><b>Image</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int PAINTING__IMAGE = 6;

	/**
	 * The number of structural features of the '<em>Painting</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int PAINTING_FEATURE_COUNT = 7;

	/**
	 * The number of operations of the '<em>Painting</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int PAINTING_OPERATION_COUNT = 0;

	/**
	 * Returns the meta object for class '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery <em>Gallery</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Gallery</em>'.
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery
	 * @generated
	 */
	EClass getGallery();

	/**
	 * Returns the meta object for the attribute '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery#getId <em>Id</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Id</em>'.
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery#getId()
	 * @see #getGallery()
	 * @generated
	 */
	EAttribute getGallery_Id();

	/**
	 * Returns the meta object for the attribute '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery#getGalleryName <em>Gallery Name</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Gallery Name</em>'.
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery#getGalleryName()
	 * @see #getGallery()
	 * @generated
	 */
	EAttribute getGallery_GalleryName();

	/**
	 * Returns the meta object for the attribute '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery#getDescription <em>Description</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Description</em>'.
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery#getDescription()
	 * @see #getGallery()
	 * @generated
	 */
	EAttribute getGallery_Description();

	/**
	 * Returns the meta object for the attribute '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery#isIsDefault <em>Is Default</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Is Default</em>'.
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery#isIsDefault()
	 * @see #getGallery()
	 * @generated
	 */
	EAttribute getGallery_IsDefault();

	/**
	 * Returns the meta object for the containment reference list '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery#getPaintings <em>Paintings</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference list '<em>Paintings</em>'.
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery#getPaintings()
	 * @see #getGallery()
	 * @generated
	 */
	EReference getGallery_Paintings();

	/**
	 * Returns the meta object for class '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting <em>Painting</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Painting</em>'.
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.Painting
	 * @generated
	 */
	EClass getPainting();

	/**
	 * Returns the meta object for the attribute '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getId <em>Id</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Id</em>'.
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getId()
	 * @see #getPainting()
	 * @generated
	 */
	EAttribute getPainting_Id();

	/**
	 * Returns the meta object for the attribute '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getImageName <em>Image Name</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Image Name</em>'.
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getImageName()
	 * @see #getPainting()
	 * @generated
	 */
	EAttribute getPainting_ImageName();

	/**
	 * Returns the meta object for the attribute '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getDescription <em>Description</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Description</em>'.
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getDescription()
	 * @see #getPainting()
	 * @generated
	 */
	EAttribute getPainting_Description();

	/**
	 * Returns the meta object for the attribute '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getAuthor <em>Author</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Author</em>'.
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getAuthor()
	 * @see #getPainting()
	 * @generated
	 */
	EAttribute getPainting_Author();

	/**
	 * Returns the meta object for the attribute '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getNoVisualizations <em>No Visualizations</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>No Visualizations</em>'.
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getNoVisualizations()
	 * @see #getPainting()
	 * @generated
	 */
	EAttribute getPainting_NoVisualizations();

	/**
	 * Returns the meta object for the attribute list '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getComments <em>Comments</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute list '<em>Comments</em>'.
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getComments()
	 * @see #getPainting()
	 * @generated
	 */
	EAttribute getPainting_Comments();

	/**
	 * Returns the meta object for the attribute '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getImage <em>Image</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Image</em>'.
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getImage()
	 * @see #getPainting()
	 * @generated
	 */
	EAttribute getPainting_Image();

	/**
	 * Returns the factory that creates the instances of the model.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the factory that creates the instances of the model.
	 * @generated
	 */
	FillTheVoidFactory getFillTheVoidFactory();

	/**
	 * <!-- begin-user-doc -->
	 * Defines literals for the meta objects that represent
	 * <ul>
	 *   <li>each class,</li>
	 *   <li>each feature of each class,</li>
	 *   <li>each operation of each class,</li>
	 *   <li>each enum,</li>
	 *   <li>and each data type</li>
	 * </ul>
	 * <!-- end-user-doc -->
	 * @generated
	 */
	interface Literals {
		/**
		 * The meta object literal for the '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.impl.GalleryImpl <em>Gallery</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.impl.GalleryImpl
		 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.impl.FillTheVoidPackageImpl#getGallery()
		 * @generated
		 */
		EClass GALLERY = eINSTANCE.getGallery();

		/**
		 * The meta object literal for the '<em><b>Id</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EAttribute GALLERY__ID = eINSTANCE.getGallery_Id();

		/**
		 * The meta object literal for the '<em><b>Gallery Name</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EAttribute GALLERY__GALLERY_NAME = eINSTANCE.getGallery_GalleryName();

		/**
		 * The meta object literal for the '<em><b>Description</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EAttribute GALLERY__DESCRIPTION = eINSTANCE.getGallery_Description();

		/**
		 * The meta object literal for the '<em><b>Is Default</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EAttribute GALLERY__IS_DEFAULT = eINSTANCE.getGallery_IsDefault();

		/**
		 * The meta object literal for the '<em><b>Paintings</b></em>' containment reference list feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EReference GALLERY__PAINTINGS = eINSTANCE.getGallery_Paintings();

		/**
		 * The meta object literal for the '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.impl.PaintingImpl <em>Painting</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.impl.PaintingImpl
		 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.impl.FillTheVoidPackageImpl#getPainting()
		 * @generated
		 */
		EClass PAINTING = eINSTANCE.getPainting();

		/**
		 * The meta object literal for the '<em><b>Id</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EAttribute PAINTING__ID = eINSTANCE.getPainting_Id();

		/**
		 * The meta object literal for the '<em><b>Image Name</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EAttribute PAINTING__IMAGE_NAME = eINSTANCE.getPainting_ImageName();

		/**
		 * The meta object literal for the '<em><b>Description</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EAttribute PAINTING__DESCRIPTION = eINSTANCE.getPainting_Description();

		/**
		 * The meta object literal for the '<em><b>Author</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EAttribute PAINTING__AUTHOR = eINSTANCE.getPainting_Author();

		/**
		 * The meta object literal for the '<em><b>No Visualizations</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EAttribute PAINTING__NO_VISUALIZATIONS = eINSTANCE.getPainting_NoVisualizations();

		/**
		 * The meta object literal for the '<em><b>Comments</b></em>' attribute list feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EAttribute PAINTING__COMMENTS = eINSTANCE.getPainting_Comments();

		/**
		 * The meta object literal for the '<em><b>Image</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EAttribute PAINTING__IMAGE = eINSTANCE.getPainting_Image();

	}

} //FillTheVoidPackage
