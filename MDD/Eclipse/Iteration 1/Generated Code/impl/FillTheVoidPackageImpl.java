/**
 */
package com.garagu.emf.fillthevoid.model.FillTheVoid.impl;

import com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidFactory;
import com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage;
import com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery;
import com.garagu.emf.fillthevoid.model.FillTheVoid.Painting;

import org.eclipse.emf.ecore.EAttribute;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.EReference;

import org.eclipse.emf.ecore.impl.EPackageImpl;

/**
 * <!-- begin-user-doc -->
 * An implementation of the model <b>Package</b>.
 * <!-- end-user-doc -->
 * @generated
 */
public class FillTheVoidPackageImpl extends EPackageImpl implements FillTheVoidPackage {
	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	private EClass galleryEClass = null;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	private EClass paintingEClass = null;

	/**
	 * Creates an instance of the model <b>Package</b>, registered with
	 * {@link org.eclipse.emf.ecore.EPackage.Registry EPackage.Registry} by the package
	 * package URI value.
	 * <p>Note: the correct way to create the package is via the static
	 * factory method {@link #init init()}, which also performs
	 * initialization of the package, or returns the registered package,
	 * if one already exists.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see org.eclipse.emf.ecore.EPackage.Registry
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage#eNS_URI
	 * @see #init()
	 * @generated
	 */
	private FillTheVoidPackageImpl() {
		super(eNS_URI, FillTheVoidFactory.eINSTANCE);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	private static boolean isInited = false;

	/**
	 * Creates, registers, and initializes the <b>Package</b> for this model, and for any others upon which it depends.
	 *
	 * <p>This method is used to initialize {@link FillTheVoidPackage#eINSTANCE} when that field is accessed.
	 * Clients should not invoke it directly. Instead, they should simply access that field to obtain the package.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #eNS_URI
	 * @see #createPackageContents()
	 * @see #initializePackageContents()
	 * @generated
	 */
	public static FillTheVoidPackage init() {
		if (isInited)
			return (FillTheVoidPackage) EPackage.Registry.INSTANCE.getEPackage(FillTheVoidPackage.eNS_URI);

		// Obtain or create and register package
		Object registeredFillTheVoidPackage = EPackage.Registry.INSTANCE.get(eNS_URI);
		FillTheVoidPackageImpl theFillTheVoidPackage = registeredFillTheVoidPackage instanceof FillTheVoidPackageImpl
				? (FillTheVoidPackageImpl) registeredFillTheVoidPackage
				: new FillTheVoidPackageImpl();

		isInited = true;

		// Create package meta-data objects
		theFillTheVoidPackage.createPackageContents();

		// Initialize created meta-data
		theFillTheVoidPackage.initializePackageContents();

		// Mark meta-data to indicate it can't be changed
		theFillTheVoidPackage.freeze();

		// Update the registry and return the package
		EPackage.Registry.INSTANCE.put(FillTheVoidPackage.eNS_URI, theFillTheVoidPackage);
		return theFillTheVoidPackage;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public EClass getGallery() {
		return galleryEClass;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public EAttribute getGallery_Id() {
		return (EAttribute) galleryEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public EAttribute getGallery_GalleryName() {
		return (EAttribute) galleryEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public EAttribute getGallery_Description() {
		return (EAttribute) galleryEClass.getEStructuralFeatures().get(2);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public EAttribute getGallery_IsDefault() {
		return (EAttribute) galleryEClass.getEStructuralFeatures().get(3);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public EReference getGallery_Paintings() {
		return (EReference) galleryEClass.getEStructuralFeatures().get(4);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public EClass getPainting() {
		return paintingEClass;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public EAttribute getPainting_Id() {
		return (EAttribute) paintingEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public EAttribute getPainting_ImageName() {
		return (EAttribute) paintingEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public EAttribute getPainting_Description() {
		return (EAttribute) paintingEClass.getEStructuralFeatures().get(2);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public EAttribute getPainting_Author() {
		return (EAttribute) paintingEClass.getEStructuralFeatures().get(3);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public EAttribute getPainting_NoVisualizations() {
		return (EAttribute) paintingEClass.getEStructuralFeatures().get(4);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public EAttribute getPainting_Comments() {
		return (EAttribute) paintingEClass.getEStructuralFeatures().get(5);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public EAttribute getPainting_Image() {
		return (EAttribute) paintingEClass.getEStructuralFeatures().get(6);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public FillTheVoidFactory getFillTheVoidFactory() {
		return (FillTheVoidFactory) getEFactoryInstance();
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	private boolean isCreated = false;

	/**
	 * Creates the meta-model objects for the package.  This method is
	 * guarded to have no affect on any invocation but its first.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public void createPackageContents() {
		if (isCreated)
			return;
		isCreated = true;

		// Create classes and their features
		galleryEClass = createEClass(GALLERY);
		createEAttribute(galleryEClass, GALLERY__ID);
		createEAttribute(galleryEClass, GALLERY__GALLERY_NAME);
		createEAttribute(galleryEClass, GALLERY__DESCRIPTION);
		createEAttribute(galleryEClass, GALLERY__IS_DEFAULT);
		createEReference(galleryEClass, GALLERY__PAINTINGS);

		paintingEClass = createEClass(PAINTING);
		createEAttribute(paintingEClass, PAINTING__ID);
		createEAttribute(paintingEClass, PAINTING__IMAGE_NAME);
		createEAttribute(paintingEClass, PAINTING__DESCRIPTION);
		createEAttribute(paintingEClass, PAINTING__AUTHOR);
		createEAttribute(paintingEClass, PAINTING__NO_VISUALIZATIONS);
		createEAttribute(paintingEClass, PAINTING__COMMENTS);
		createEAttribute(paintingEClass, PAINTING__IMAGE);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	private boolean isInitialized = false;

	/**
	 * Complete the initialization of the package and its meta-model.  This
	 * method is guarded to have no affect on any invocation but its first.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public void initializePackageContents() {
		if (isInitialized)
			return;
		isInitialized = true;

		// Initialize package
		setName(eNAME);
		setNsPrefix(eNS_PREFIX);
		setNsURI(eNS_URI);

		// Create type parameters

		// Set bounds for type parameters

		// Add supertypes to classes

		// Initialize classes, features, and operations; add parameters
		initEClass(galleryEClass, Gallery.class, "Gallery", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getGallery_Id(), ecorePackage.getEString(), "id", null, 0, 1, Gallery.class, !IS_TRANSIENT,
				!IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getGallery_GalleryName(), ecorePackage.getEString(), "galleryName", null, 0, 1, Gallery.class,
				!IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getGallery_Description(), ecorePackage.getEString(), "description", null, 0, 1, Gallery.class,
				!IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getGallery_IsDefault(), ecorePackage.getEBoolean(), "isDefault", null, 0, 1, Gallery.class,
				!IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getGallery_Paintings(), this.getPainting(), null, "paintings", null, 0, -1, Gallery.class,
				!IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE,
				IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(paintingEClass, Painting.class, "Painting", !IS_ABSTRACT, !IS_INTERFACE,
				IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getPainting_Id(), ecorePackage.getEString(), "id", null, 0, 1, Painting.class, !IS_TRANSIENT,
				!IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getPainting_ImageName(), ecorePackage.getEString(), "imageName", null, 0, 1, Painting.class,
				!IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getPainting_Description(), ecorePackage.getEString(), "description", null, 0, 1, Painting.class,
				!IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getPainting_Author(), ecorePackage.getEString(), "author", null, 0, 1, Painting.class,
				!IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getPainting_NoVisualizations(), ecorePackage.getEInt(), "noVisualizations", null, 0, 1,
				Painting.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE,
				!IS_DERIVED, IS_ORDERED);
		initEAttribute(getPainting_Comments(), ecorePackage.getEString(), "comments", null, 0, -1, Painting.class,
				!IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getPainting_Image(), ecorePackage.getEByteArray(), "image", null, 0, 1, Painting.class,
				!IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		// Create resource
		createResource(eNS_URI);
	}

} //FillTheVoidPackageImpl
